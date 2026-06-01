
export function validateInputs(
  email: string,
  password: string,
  checkFor: boolean,
  username?: string,
): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if ((checkFor && !username) || (username && username.length < 2))
    return "Name must be at least 2 characters long";

  if (!email || !emailRegex.test(email))
    return "Please enter a valid email address";

  if (!password || !passwordRegex.test(password))
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";

  return "";
}
