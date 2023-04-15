/* Regex for Verification */
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,63}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_\-@#$%^&*()!+=]{8,}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_ ]{3,19}$/;

export { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX };
