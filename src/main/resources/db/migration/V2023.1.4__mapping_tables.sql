--CREATE TABLE IF NOT EXISTS user_inventory (
--      user_id BIGINT NOT NULL,
--      inventory_id BIGINT NOT NULL,
--      CONSTRAINT inventory_id FOREIGN KEY (inventory_id) REFERENCES inventory(id),
--      CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id)
--);
--
--CREATE TABLE IF NOT EXISTS user_notifications (
--       user_id BIGINT NOT NULL,
--       notifications_id BIGINT NOT NULL,
--       CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id),
--       CONSTRAINT notifications_id FOREIGN KEY (notifications_id) REFERENCES notifications(id)
--     );

CREATE TABLE IF NOT EXISTS inventory_collections (
      inventory_id BIGINT NOT NULL,
      collection_id BIGINT NOT NULL,
      CONSTRAINT inventory_id FOREIGN KEY (inventory_id) REFERENCES inventory(id),
      CONSTRAINT collection_id FOREIGN KEY (collection_id) REFERENCES collections(id)
);

CREATE TABLE IF NOT EXISTS collection_food_items (
       collection_id BIGINT NOT NULL,
       food_item_id BIGINT NOT NULL,
       CONSTRAINT collection_id FOREIGN KEY (collection_id) REFERENCES collections(id),
       CONSTRAINT food_item_id FOREIGN KEY (food_item_id) REFERENCES food_items(id)
     );