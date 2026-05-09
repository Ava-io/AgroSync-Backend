export const createRecordTransactionTable = `
CREATE TABLE IF NOT EXISTS record_transaction(
transaction_id INT REFERENCES transaction(id) ON DELETE CASCADE,
payment_method VARCHAR(50) DEFAULT 'bank transfer' CHECK (payment_method IN 'bank transfer', 'cash', 'cheque', 'mobile money'),
references VARCHAR(50),
notes TEXT NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
