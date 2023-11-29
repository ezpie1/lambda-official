alter table "public"."Blogs" add column "likes" bigint;

create policy "allow only auth users from updating likes column"
on "public"."Blogs"
as permissive
for update
to authenticated
using (true)
with check (true);



