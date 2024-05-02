alter table "public"."profiles" add column "followers" jsonb[];

alter table "public"."profiles" add column "following" jsonb[];

create policy "update_followers_policy"
on "public"."profiles"
as permissive
for update
to authenticated
using (true);



