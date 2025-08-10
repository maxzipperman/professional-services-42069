
-- Orders (payment attempts and recorded purchases)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid, -- optional, we won't FK to auth.users per guidelines
  email text not null,
  stripe_session_id text unique,
  amount integer not null, -- in cents
  currency text not null default 'usd',
  status text not null default 'pending', -- e.g., pending, paid, canceled, failed
  kind text not null check (kind in ('audit','followup')),
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Line items for custom/follow-up payments
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  name text not null,
  amount integer not null, -- in cents, per unit
  quantity integer not null default 1,
  metadata jsonb
);

-- Enable RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies:
-- Allow authenticated users to read their own orders (if you add auth later)
create policy if not exists orders_select_own
on public.orders
for select
to authenticated
using (user_id = auth.uid());

-- Allow edge functions (service role) to insert and update orders
create policy if not exists orders_insert_any
on public.orders
for insert
to authenticated
with check (true);

create policy if not exists orders_update_any
on public.orders
for update
to authenticated
using (true);

-- Order items: same pattern (select own items through order ownership)
create policy if not exists order_items_select_own
on public.order_items
for select
to authenticated
using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

create policy if not exists order_items_insert_any
on public.order_items
for insert
to authenticated
with check (true);

create policy if not exists order_items_update_any
on public.order_items
for update
to authenticated
using (true);

-- Helpful indexes
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_session_idx on public.orders (stripe_session_id);
create index if not exists order_items_order_id_idx on public.order_items (order_id);
