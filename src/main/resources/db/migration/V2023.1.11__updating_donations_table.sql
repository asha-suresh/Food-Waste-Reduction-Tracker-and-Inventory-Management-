ALTER TABLE donations
ADD COLUMN IF NOT EXISTS acceptance_requested_users VARCHAR(1000);
