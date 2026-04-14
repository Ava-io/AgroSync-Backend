export const generatePassword = (name) => {
  const alph = "abcdefghijklmnopqrstuvwxyz0123456789?@*~!()-_$#^&+";
  let password = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * alph.length);
    password += alph[randomIndex];
  }

  const farmPart = name.slice(0, 3).toLowerCase();

  return farmPart + password;

  // Math.random() 0.65 * 24
  floor = 1;
};
