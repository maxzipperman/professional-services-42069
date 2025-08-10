import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

export interface UploadResult {
  bucket: string;
  path: string;
  publicUrl?: string;
}

interface UploadProps {
  bucket?: string;
  folder?: string;
  accept?: string;
  maxSizeMB?: number;
  onUploaded?: (result: UploadResult) => void;
  label?: string;
}

// Simple, reusable upload component that uses a signed upload URL from an Edge Function
export const Upload: React.FC<UploadProps> = ({
  bucket = "customer-uploads",
  folder = "",
  accept = "image/*,application/pdf",
  maxSizeMB = 10,
  onUploaded,
  label = "Upload file",
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast({ title: "No file selected", description: "Choose a file to upload." });
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({ title: "File too large", description: `Max size is ${maxSizeMB}MB.` });
      return;
    }

    try {
      setUploading(true);
      setProgress(5);

      // 1) Ask the Edge Function for a signed upload token
      const { data, error } = await supabase.functions.invoke("sign-upload", {
        body: {
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          bucket,
          folder,
          maxSizeMB,
          allow: accept.split(",").map((s) => s.trim()).filter(Boolean),
        },
      });

      if (error || !data) {
        throw new Error(error?.message || "Failed to get signed upload");
      }

      setProgress(20);

      // 2) Upload using Supabase storage signed upload token
      const { error: uploadErr } = await supabase.storage
        .from(data.bucket)
        .uploadToSignedUrl(
          data.path,
          data.token,
          file,
          {
            contentType: file.type || undefined,
          }
        );

      if (uploadErr) throw uploadErr;

      setProgress(100);
      toast({ title: "Upload complete", description: file.name });
      onUploaded?.({ bucket: data.bucket, path: data.path, publicUrl: data.publicUrl });
    } catch (e: any) {
      console.error("upload error", e);
      toast({ title: "Upload failed", description: e?.message || "Unexpected error" });
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          ref={fileRef}
          type="file"
          accept={accept}
          aria-label={label}
          disabled={uploading}
        />
        <Button onClick={handleUpload} disabled={uploading} data-cta="upload_file">
          {uploading ? "Uploading..." : label}
        </Button>
      </div>
      {uploading && (
        <div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default Upload;
