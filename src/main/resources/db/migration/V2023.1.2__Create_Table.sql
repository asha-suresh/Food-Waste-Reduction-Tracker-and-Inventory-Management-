create table if not exists food_info (
    id bigint not null,
    calorie integer,
    expiry_day integer,
    food_name varchar(255),
    category varchar(15),
    protein DOUBLE PRECISION,
    primary key (id));


create table if not exists users (
    id bigint not null ,
    email varchar(255),
    password varchar(255),
    user_name varchar(255),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id));


create table if not exists inventory (
    id bigint not null,
    primary key (id));


create table if not exists collections (
    id bigint not null ,
    collection_name varchar(40),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id));


create table if not exists food_items (
    id bigint not null,
    food_name varchar(255),
    category varchar(15),
    quantity integer,
    consumed_quantity integer not null,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP NOT NULL,
    warning_date TIMESTAMP NOT NULL,
    status VARCHAR(10),
    is_warning_notified boolean DEFAULT false,
    is_expiry_notified boolean DEFAULT false,
    user_id bigint not null,
    primary key (id));


create table if not exists notifications (
    id bigint not null ,
    notification_title varchar(255),
    message varchar(1255),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    priority varchar(1255),
    seen_by_user boolean,
    primary key (id));


create table if not exists donations (
    id bigint not null,
    food_name varchar(255),
    category varchar(15),
    quantity integer,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP NOT NULL,
    is_donation_active boolean DEFAULT true,
    user_id bigint not null,
    primary key (id));