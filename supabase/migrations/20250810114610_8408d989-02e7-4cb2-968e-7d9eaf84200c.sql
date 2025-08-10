-- Add a minimal RLS policy so the linter warning is addressed
create policy if not exists "Authenticated can insert leads"
  on public.leads
  for insert
  to authenticated
  with check (true);

-- Note: No SELECT/UPDATE/DELETE policies are added. Service role (edge functions) bypass RLS.