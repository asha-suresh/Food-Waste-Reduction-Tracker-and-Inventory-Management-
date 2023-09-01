ALTER TABLE notifications
ADD COLUMN IF NOT EXISTS alert_shown boolean DEFAULT false;
