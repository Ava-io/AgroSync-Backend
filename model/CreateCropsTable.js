export const createCropsTable = `
CREATE TABLE IF NOT EXISTS crops(
id SERIAL PRIMARY KEY,
crop_name VARCHAR(225) NOT NULL,
plot VARCHAR(50) NOT NULL,
area VARCHAR(50) NOT NULL,
planted_date DATE, 
expected_harvest DATE,
status VARCHAR(10) DEFAULT 'growing' CHECK (status IN ('growing', 'alert', 'harvest soon')),
actions VARCHAR(225) NOT NULL,
variety VARCHAR(100) NOT NULL,
note TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
