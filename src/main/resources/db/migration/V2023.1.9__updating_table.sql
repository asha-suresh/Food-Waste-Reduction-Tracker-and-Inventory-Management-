
-- Add the username column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS username VARCHAR(30);

-- Add the email column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS email VARCHAR(30);

-- Add the phone_no column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS phone_no VARCHAR(16);

-- Add the house_no column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS house_no VARCHAR(30);

-- Add the street_or_city column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS street_or_city VARCHAR(30);

-- Add the pin_code column
ALTER TABLE donations
ADD COLUMN IF NOT EXISTS pin_code VARCHAR(10);



-- Add the phone_no column for users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS phone_no VARCHAR(16);

-- Add the house_no column
ALTER TABLE users
ADD COLUMN IF NOT EXISTS house_no VARCHAR(30);

-- Add the street_or_city column
ALTER TABLE users
ADD COLUMN IF NOT EXISTS street_or_city VARCHAR(30);

-- Add the pin_code column
ALTER TABLE users
ADD COLUMN IF NOT EXISTS pin_code VARCHAR(10);
