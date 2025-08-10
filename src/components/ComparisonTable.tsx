import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Minus } from 'lucide-react';
import type { ComparisonTableData } from '@/types/industry';

interface ComparisonTableProps {
  data: ComparisonTableData;
}

export const ComparisonTable = ({ data }: ComparisonTableProps) => {
  const renderValue = (val: string) => {
    const normalized = val.trim().toLowerCase();
    if (normalized === 'yes') return <Check className="h-5 w-5 text-primary" aria-label="Yes" />;
    if (normalized === 'no') return <X className="h-5 w-5 text-destructive" aria-label="No" />;
    if (normalized === 'partial' || normalized === 'sometimes') return <Minus className="h-5 w-5 text-muted-foreground" aria-label="Partial" />;
    return <span className="text-sm">{val}</span>;
  };

  return (
    <Card className="border-0 shadow-soft">
      {(data.title || data.subtitle) && (
        <CardHeader className="text-center">
          {data.title && <CardTitle className="text-3xl">{data.title}</CardTitle>}
          {data.subtitle && <p className="text-muted-foreground mt-2">{data.subtitle}</p>}
        </CardHeader>
      )}
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-1/3">Feature</TableHead>
              {data.columns.map((col, idx) => (
                <TableHead key={idx} className="text-center">
                  <div className="inline-flex items-center gap-2">
                    <span>{col}</span>
                    {idx === 0 && <Badge className="ml-1">Best Value</Badge>}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rows.map((row, rIdx) => (
              <TableRow key={rIdx} className={row.emphasis ? 'bg-muted/40' : ''}>
                <TableCell className="font-medium">{row.label}</TableCell>
                {row.values.map((v, cIdx) => (
                  <TableCell key={cIdx} className="text-center">
                    {renderValue(v)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data.footnote && (
          <p className="text-xs text-muted-foreground mt-4">{data.footnote}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;
