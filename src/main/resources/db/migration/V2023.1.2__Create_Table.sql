create table if not exists food_info (
    id bigint not null,
    calorie integer,
    expiry_day integer,
    food_name varchar(255),
    category varchar(15),
    protein integer,
    primary key (id));

create table if not exists users (
    id bigint not null ,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email varchar(255),
    modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    password varchar(255),
    user_name varchar(255),
    verified boolean,
    primary key (id));


create table if not exists inventory (
    id bigint not null,
    total_items integer,
    primary key (id));

create table if not exists collections (
    id bigint not null ,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id));

create table if not exists food_items (
    id bigint not null ,
    created_date timestamp(6),
    expiry_date timestamp(6),
    food_name varchar(255),
    quantity integer,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    warning_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id));


create table if not exists notifications (
    id bigint not null ,
    notification_title varchar(255),
    message varchar(1255),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    priority varchar(1255),
    seen_by_user boolean,
    primary key (id));