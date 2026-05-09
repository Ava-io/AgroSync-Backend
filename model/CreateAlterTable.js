// export const removeFirstNameColumn = `
// ALTER TABLE users
// DROP COLUMN first_name
// `;

// // export const removeLastNameColumnn = `
// // ALTER TABLE users
// // DROP COLUMN last_name
// // `;

export const removePhoneColumn = `
ALTER TABLE users
DROP COLUMN phone_number
`;

export const addCreatedatColumn = `
ALTER TABLE equipment_use
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`;
