
create table if not exists donation_status (
    id bigint not null ,
    request_created_by bigint not null,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status varchar(30),
    primary key (id));