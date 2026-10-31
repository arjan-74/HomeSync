const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkText(value, label, maxLength) {
  if (typeof value !== "string" || !value.trim()) return `${label} is required`;
  if (value.trim().length > maxLength) return `${label} must be ${maxLength} characters or less`;
  return null;
}

function checkEmail(value) {
  if (typeof value !== "string" || !EMAIL_PATTERN.test(value.trim())) {
    return "Please enter a valid email address";
  }
  return null;
}

function checkPassword(value) {
  if (typeof value !== "string" || value.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[a-z]/i.test(value) || !/\d/.test(value)) {
    return "Password must contain at least one letter and one number";
  }
  return null;
}

module.exports = { checkText, checkEmail, checkPassword };
