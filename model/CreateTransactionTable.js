export const createTransactionTable = `
CREATE TABLE IF NOT EXISTS transactions(
id SERIAL PRIMARY KEY,
date VARCHAR(50) NOT NULL,
description VARCHAR(225) NOT NULL,
category VARCHAR(50) DEFAULT 'income' CHECK (category IN('income', 'expense')),
amount INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
