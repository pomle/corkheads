export function isEmailValid(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}
