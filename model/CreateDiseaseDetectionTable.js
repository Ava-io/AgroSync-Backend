export const createDiseaseDetectionTable = `
CREATE TABLE IF NOT EXISTS diseases(
id SERIAL PRIMARY KEY,
crops_id INT REFERENCES crops(id) ON DELETE CASCADE,
livestock_id INT REFERENCES livestock(id) ON DELETE CASCADE,
disease_name VARCHAR(225) NOT NULL,
treatment_status VARCHAR(50) DEFAULT 'ongoing' CHECK (treatment_status IN('ongoing', 'pending', 'treated')),
ai_response TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
