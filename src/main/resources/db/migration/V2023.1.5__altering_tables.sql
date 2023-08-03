

CREATE TABLE IF NOT EXISTS user_notifications (
       user_id BIGINT NOT NULL,
       notifications_id BIGINT NOT NULL,
       CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id),
       CONSTRAINT notifications_id FOREIGN KEY (notifications_id) REFERENCES notifications(id)
     );