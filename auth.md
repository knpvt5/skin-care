# authenticaiton

1. remove the cart icon from the navbar and replace it with login/signup
2. i have create this table in supabase: -
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user', 
  created_at timestamptz default now()
);
 for rolebaseed access, so now the admin page should only visible when admin user is logged in
3. i have also created this trigger function in supabase: 
 create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
so that we can create a new user using supabase auth builtin method, it will also update the profiles table

## so now create full authenticaiton system for this applicaiton