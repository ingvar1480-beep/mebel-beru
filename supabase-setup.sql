-- Выполнить в SQL Editor проекта Supabase. Администратор назначается отдельно в Dashboard.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;
grant select on public.admins to authenticated;
create policy "Admins can see own membership" on public.admins for select to authenticated using (user_id = auth.uid());

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('sofas','beds','mattresses','storage','kitchens')),
  name text not null, description text not null default '', price text not null,
  delivery text not null, image text not null, tag text not null default '',
  option_label text not null default '', options jsonb not null default '[]'::jsonb,
  second_label text not null default '', second_options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
create policy "Public product read" on public.products for select to anon, authenticated using (true);
create policy "Admin product insert" on public.products for insert to authenticated with check (exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admin product update" on public.products for update to authenticated using (exists (select 1 from public.admins where user_id = auth.uid())) with check (exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admin product delete" on public.products for delete to authenticated using (exists (select 1 from public.admins where user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "Public product images" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "Admin image upload" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admin image delete" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and exists (select 1 from public.admins where user_id = auth.uid()));
