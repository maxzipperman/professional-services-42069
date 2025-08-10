-- Create leads table to capture emails and context from downloads and AI analyzer
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  website text,
  source text not null check (source in ('lead_magnet','ai_analyzer')),
  industry text,
  page text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS). We will write via Edge Functions using the service role.
alter table public.leads enable row level security;

-- Indexes for querying
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_source_idx on public.leads (source);
