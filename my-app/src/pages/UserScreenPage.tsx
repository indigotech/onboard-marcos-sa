import * as React from "react";
import "./UserScreenPage.css";
import { FormErrors } from "./FormsErrors";
import * as Validation from "../Validation";
import { mutateCreatUser } from "../CreateUserIntegration";

interface UserScreenState {
  name: string;
  phone: string;
  birthDate: Date;
  email: string;
  password: string;
  roleAdmin: boolean;
  roleUser: boolean;
  role:string;
  formErrors: {
    email: string;
    phone: string;
    password: string;
    birthDate: Date;
    checkbox: boolean;
  };
  emailValid: boolean;
  passwordValid: boolean;
  phoneValid: boolean;
  birthDateValid: boolean;
  checkboxValid: boolean;
}

export class UserScreenPage extends React.Component<{}, UserScreenState> {
  constructor(props) {
    super(props);
    this.toggleCheckboxAdmin = this.toggleCheckboxAdmin.bind(this);
    this.toggleCheckboxUser = this.toggleCheckboxUser.bind(this);
    this.state = {
      name: "",
      phone: "",
      birthDate: new Date(),
      email: "",
      password: "",
      roleAdmin: false,
      roleUser: false,
      role: "",
      formErrors: {
        email: "",
        phone: "",
        password: "",
        birthDate: new Date(),
        checkbox: false,
      },
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      birthDateValid: true,
      checkboxValid: false,
    };
  }

  private handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value } as any);
  };

  private handleButtonClick = () => {
    const email = this.state.email;
    const phone = this.state.phone;
    const password = this.state.password;
    const birthDate = this.state.birthDate;
    const roleAdmin = this.state.roleAdmin;
    const roleUser = this.state.roleUser;

    const isEmailValid = Validation.validateEmail(
      email,
      this.state.formErrors,
      this.state.emailValid
    );
    const isPhoneValid = Validation.validatePhone(
      phone,
      this.state.formErrors,
      this.state.phoneValid
    );
    const isPasswordValid = Validation.validatePassword(
      password,
      this.state.formErrors,
      this.state.passwordValid
    );
    const isBirthDateValid = Validation.validateBirthDate(
      // birthDate,
      // this.state.formErrors,
      // this.state.birthDateValid
    );
    const isCheckboxValid = Validation.validateCheckbox(
      roleUser,
      roleAdmin,
      this.state.formErrors,
      this.state.checkboxValid
    );
    this.setState({
      formErrors: isEmailValid.formErrors,
      emailValid: isEmailValid.emailValid,
      passwordValid: isPasswordValid.passwordValid,
      phoneValid: isPhoneValid.phoneValid,
      // birthDateValid: isBirthDateValid.birthDateValid,
      checkboxValid: isCheckboxValid.checkboxValid,
    });
    this.setState({
      formErrors: isPhoneValid.formErrors,
    });
    // this.setState({
    //   formErrors: isBirthDateValid.formErrors,
    // });
    this.setState({
      formErrors: isCheckboxValid.formErrors,
    });
    this.setState({
      formErrors: isPasswordValid.formErrors,
    });
    this.willCreate();
  };

  private async willCreate() {
    const emailValid = this.state.emailValid;
    const passwordValid = this.state.passwordValid;
    const phoneValid = this.state.phoneValid;
    const birthDateValid = this.state.birthDateValid;
    const checkboxValid = this.state.checkboxValid;
    console.log("OI")
    if (emailValid && phoneValid && birthDateValid && checkboxValid && passwordValid) {
      console.log("OI2")
      if(this.state.roleAdmin == true){
        this.setState({role:"admin"})
      }else{
        this.setState({role:"user"})
      }
      try {
        await mutateCreatUser(this.state.name, this.state.email, this.state.phone, this.state.birthDate, this.state.password, this.state.role);
      } catch (error) {
        const message =
          error.graphQLErrors?.[0]?.message || "Não foi possível criar";
        alert(message);
      }
    }
  }

  private toggleCheckboxUser() {
    this.setState({ roleUser: !this.state.roleUser });
  }

  private toggleCheckboxAdmin() {
    this.setState({ roleAdmin: !this.state.roleAdmin });
  }

  private handlebirthDate() {}

  render() {
    return (
      <div>
        <h1 className="h1NewUser">Crie um novo usuario!</h1>
        <form className="formsBig">
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="name">Nome</label>
            </div>
            <input
              type="name"
              name="name"
              className="Input"
              value={this.state.name}
              onChange={this.handleUserInput}
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="email">Email</label>
            </div>
            <input
              type="email"
              name="email"
              className="Input"
              value={this.state.email}
              onChange={this.handleUserInput}
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="password">Senha</label>
            </div>
            <input
              type="password"
              name="password"
              className="Input"
              value={this.state.password}
              onChange={this.handleUserInput}
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="birthdate">Data de aniversário</label>
            </div>
            <input
              type="date"
              name="birthdate"
              className="Input"
              onChange={this.handlebirthDate}
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="phone">Celular</label>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="Input"
              value={this.state.phone}
              onChange={this.handleUserInput}
            ></input>
          </div>
          <div className="formsChildRole">
            <div className="span">
              <label htmlFor="role">Papel</label>
            </div>
            <input
              type="checkbox"
              name="roleUser"
              className="roleInput"
              onChange={this.toggleCheckboxUser}
            ></input>
            <p className="labelRole">User</p>
            <input
              type="checkbox"
              name="roleAdmin"
              className="roleInput"
              onChange={this.toggleCheckboxAdmin}
            ></input>
            <p className="labelRole">Admin</p>
          </div>
          <button
            type="button"
            className="loginbt"
            onClick={this.handleButtonClick}
          >
            Criar usuário
          </button>
        </form>
      </div>
    );
  }
}
