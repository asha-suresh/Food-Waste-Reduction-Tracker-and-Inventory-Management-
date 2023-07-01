alter table food_info add column if not exists category varchar(15);

alter table inventory add column if not exists category varchar(15);
