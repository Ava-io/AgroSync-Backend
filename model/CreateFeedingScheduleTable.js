export const createFeedingScheduleTable = `
CREATE TABLE IF NOT EXISTS feeding_schedule(
id SERIAL PRIMARY KEY,
animal_type VARCHAR(50) NOT NULL,
feed_type VARCHAR(225) NOT NULL,
quantity_perday VARCHAR(100) NOT NULL,
time VARCHAR(10) NOT NULL,
status VARCHAR(50) DEFAULT 'on schedule' CHECK (status IN ('on schedule', 'low stock')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
