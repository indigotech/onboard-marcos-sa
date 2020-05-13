
export function validateEmail(value, fieldValidationErrors, emailValid) {
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid ? "" : "Email não é válido";
    var EmailValidate = {
    formErrors: fieldValidationErrors,
    emailValid: emailValid}
    return(EmailValidate)
}

  export function validatePassword(value, fieldValidationErrors, passwordValid ) {
    passwordValid = value.length >= 7 && value.match(/^(?=.*[a-z])(?=.*[0-9])/);
    fieldValidationErrors.password = passwordValid
      ? ""
      : "Senha necessita de, pelo menos, um número e uma letra";
      var EmailValidate = {
        formErrors: fieldValidationErrors,
        passwordValid: passwordValid}
        return(EmailValidate)
      }