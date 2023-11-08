drop policy "allow only auth users to view posts" on "public"."Blogs";

create policy "anyone can view posts"
on "public"."Blogs"
as permissive
for select
to public
using (true);



