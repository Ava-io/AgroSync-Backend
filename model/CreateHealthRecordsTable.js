export const createHealthRecordTable = `
CREATE TABLE IF NOT EXISTS health_records(
id SERIAL PRIMARY KEY,
animal_id VARCHAR(100) NOT NULL,
animal_type VARCHAR(50) NOT NULL,
health_condition VARCHAR(225) NOT NULL,
vet VARCHAR(225) NOT NULL,
date VARCHAR(50) NOT NULL, 
status VARCHAR(50) DEFAULT 'clear' CHECK (status IN('clear', 'vaccinated', 'treatment', 'complete')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
