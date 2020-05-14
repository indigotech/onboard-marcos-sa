export function validateEmail(value, fieldValidationErrors, emailValid) {
  emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  fieldValidationErrors.email = emailValid ? "" : "Email não é válido";
  var emailValidate = {
    formErrors: fieldValidationErrors,
    emailValid: emailValid,
  };
  return emailValidate;
}

export function validatePassword(value, fieldValidationErrors, passwordValid) {
  passwordValid = value.length >= 7 && value.match(/^(?=.*[a-z])(?=.*[0-9])/);
  fieldValidationErrors.password = passwordValid
    ? ""
    : "Senha necessita de, pelo menos, um número e uma letra";
  var passwordValidate = {
    formErrors: fieldValidationErrors,
    passwordValid: passwordValid,
  };
  return passwordValidate;
}

export function validatePhone(value, fieldValidationErrors, phoneValid) {
  phoneValid = value.match(
    /^\d{11}$/
  );
  fieldValidationErrors.phoneValid = phoneValid
    ? ""
    : "Colocar apenas números no telefone";
  var phoneValidate = {
    formErrors: fieldValidationErrors,
    phoneValid: phoneValid,
  };
  return phoneValidate;
}

export function validateBirthDate(){
//   value,
//   fieldValidationErrors,
//   birthDateValid
// ) {
//   var now = new Date();
//   if (value.getTime() < now.getTime()) {
//     birthDateValid = true;
//   } else {
//     birthDateValid = false;
//   }
//   fieldValidationErrors.birthDate = birthDateValid ? "" : "Data incorreta!";
//   var birthdateValidate = {
//     formErrors: fieldValidationErrors,
//     birthDateValid: birthDateValid,
//   };
  return true;
}

export function validateCheckbox(
  roleUser,
  roleAdmin,
  fieldValidationErrors,
  checkboxValid
) {
  if ((roleUser && roleAdmin) || (roleUser == false && roleAdmin == false)) {
    checkboxValid = false;
  } else {
    checkboxValid = true;
  }

  fieldValidationErrors.checkbox = checkboxValid
    ? ""
    : "Selecione apenas 1 checkbox";
  var checkboxValidate = {
    formErrors: fieldValidationErrors,
    checkboxValid: checkboxValid,
  };
  return checkboxValidate;
}
