
export function validateSignupEmail(email) {
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regex_ucla_email = /^[^\s@]+@(g\.)?ucla\.edu$/

  return regex_email.test(email)
}

export function validateSignupPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  return regex.test(password)
}

export const passwordRequirements = "Password must be at least 8 characters and contain at least 1 letter and number"