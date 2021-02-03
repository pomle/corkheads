const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function createRandomPassword(length = 20) {
  const password: string[] = [];
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * CHARS.length);
    const char = CHARS[index];
    password.push(char);
  }
  return password.join("");
}
