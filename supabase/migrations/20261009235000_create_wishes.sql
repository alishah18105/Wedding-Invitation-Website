create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null
    check (
      char_length(guest_name) between 1 and 100
      and guest_name = btrim(guest_name)
    ),
  message text not null
    check (
      char_length(message) between 1 and 1000
      and message = btrim(message)
    ),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_id_idx
  on public.wishes (created_at desc, id desc);

alter table public.wishes enable row level security;

drop policy if exists "Public can read wishes" on public.wishes;
create policy "Public can read wishes"
  on public.wishes
  for select
  to anon
  using (true);

drop policy if exists "Public can insert wishes" on public.wishes;
create policy "Public can insert wishes"
  on public.wishes
  for insert
  to anon
  with check (true);

revoke all on table public.wishes from anon;
grant select, insert on table public.wishes to anon;
