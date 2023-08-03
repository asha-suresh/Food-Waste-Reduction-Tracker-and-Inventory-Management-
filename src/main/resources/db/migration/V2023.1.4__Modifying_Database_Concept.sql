drop table inventory;


    create table if not exists items (
    id bigint not null ,
    created_date timestamp(6),
    expiry_date timestamp(6),
    product_name varchar(255),
    quantity integer,
    updated_date timestamp(6),
    warning_date timestamp(6),
    primary key (id));

create table if not exists inventory (
    id bigint not null,
    total_items integer,
    primary key (id));

create table if not exists shopping_cart (
    id bigint not null ,
    created_date timestamp(6),
    primary key (id));

    CREATE TABLE IF NOT EXISTS user_inventory (
      user_id BIGINT NOT NULL,
      inventory_id BIGINT NOT NULL,
      CONSTRAINT inventory_id FOREIGN KEY (inventory_id) REFERENCES inventory(id),
      CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id)
    );

     CREATE TABLE IF NOT EXISTS inventory_cart (
          inventory_id BIGINT NOT NULL,
          cart_id BIGINT NOT NULL,
          CONSTRAINT inventory_id FOREIGN KEY (inventory_id) REFERENCES inventory(id),
          CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES shopping_cart(id)
        );

      CREATE TABLE IF NOT EXISTS shopping_cart_items (
               shopping_cart_id BIGINT NOT NULL,
               item_id BIGINT NOT NULL,
               CONSTRAINT shopping_cart_id FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart(id),
               CONSTRAINT item_id FOREIGN KEY (item_id) REFERENCES items(id)
             );

