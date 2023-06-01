-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso3166Alpha2" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "addr1" TEXT,
    "addr2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "post_code" TEXT,
    "country_id" INTEGER,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add RLS
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;

-- Add RLS
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

-- Profile policies
create policy "Profiles are viewable by users who created them."
  on profiles for select to authenticated
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert to authenticated
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update to authenticated
  using ( auth.uid() = id );

-- Add RLS
ALTER TABLE "countries" ENABLE ROW LEVEL SECURITY;

-- Countries policies
create policy "Countries are viewable by all."
  on countries for select
  using (true);

-- Inserts a row into public.profile
create function public.handle_new_profile()
-- Return type of the function: a Postgres trigger
returns trigger
-- Language used, plpgsql is a Postgres-specific SQL language 
language plpgsql
-- Define security rules: trusted schemas (public)
security definer set search_path = public
-- Start definition of the function
as $$
begin
  insert into public.profiles (id,email)
  -- Reference the newly created `id` and `email` columns
  values (new.id,new.email);
  return new;
end;
-- Return the function
$$;
-- Trigger the function every time a user is created
create trigger on_auth_user_created
  -- New sign up: insert in `auth.users`
  after insert on auth.users
  -- Call `handle_new_profile` function
  for each row execute procedure public.handle_new_profile();

--update a row at public.users
create function public.handle_update_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  update public.profiles
  set email = new.email
  where id = new.id;
  return new;
end;
$$;
-- trigger the function every time a user email is updated
create trigger on_auth_user_updated
  after update of email on auth.users
  for each row execute procedure public.handle_update_user();

-- Add relatime to profiles
alter publication supabase_realtime add table profiles;