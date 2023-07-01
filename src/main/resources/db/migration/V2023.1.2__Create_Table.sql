create table if not exists food_info (
    id bigint not null,
    calorie integer,
    expiry_day integer,
    product_name varchar(255),
    protein integer,
    primary key (id));
    create table if not exists inventory (
    id bigint not null ,
    created_date timestamp(6),
    expiry_date timestamp(6),
    product_name varchar(255),
    quatity integer,
    updated_date timestamp(6),
    user_id bigint,
    warning_date timestamp(6),
    primary key (id));

create table if not exists users (
    id bigint not null ,
    created_date timestamp(6),
    email varchar(255),
    modified_date timestamp(6),
    password varchar(255),
    user_name varchar(255),
    verified boolean,
    primary key (id));