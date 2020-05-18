export function validateEmail(value, fieldValidationErrors) {
  const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  fieldValidationErrors.email = emailValid ? "" : "Email não é válido";
  var emailValidate = {
    formErrors: fieldValidationErrors
  };
  return emailValidate;
}

export function validatePassword(value, fieldValidationErrors) {
  const passwordValid = value.length >= 7 && value.match(/^(?=.*[a-z])(?=.*[0-9])/);
  fieldValidationErrors.password = passwordValid
    ? ""
    : "Senha necessita de, pelo menos, um número e uma letra";
  var passwordValidate = {
    formErrors: fieldValidationErrors
  };
  return passwordValidate;
}

export function validatePhone(value, fieldValidationErrors) {
  const phoneValid = value.match(/^\d{11}$/);
  fieldValidationErrors.phoneValid = phoneValid
    ? ""
    : "Colocar apenas números no telefone";
  var phoneValidate = {
    formErrors: fieldValidationErrors
  };
  return phoneValidate;
}

export function validateBirthDate(
  value,
  fieldValidationErrors
) {
  const now = new Date();
  const birth = new Date(value);
  let birthDateValid = false
  if (birth.getTime() < now.getTime()) {
    birthDateValid = true;
  } else {
    birthDateValid = false;
  }
  fieldValidationErrors.birthDate = birthDateValid ? "" : "Data incorreta!";
  var birthdateValidate = {
    formErrors: fieldValidationErrors
  };
  return birthdateValidate;
}

