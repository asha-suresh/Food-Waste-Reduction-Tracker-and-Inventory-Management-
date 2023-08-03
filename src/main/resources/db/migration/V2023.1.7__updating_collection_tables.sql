ALTER TABLE collections
ADD collection_name varchar(40);

ALTER TABLE collections
ADD updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
