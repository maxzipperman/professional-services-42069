create policy "Authenticated can insert leads"
  on public.leads
  for insert
  to authenticated
  with check (true);