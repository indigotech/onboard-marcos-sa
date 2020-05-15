import * as React from "react";
import "./CreateUserPage.css";
import { FormErrors } from "./FormsErrors";
import * as Validation from "../Validation";
import { mutateCreatUser } from "../CreateUserIntegration";
import { changeURL } from "../ChangeUrl";

interface CreateState {
  name: string;
  phone: string;
  birthDate: Date;
  birthDateString: string;
  email: string;
  password: string;
  roleAdmin: boolean;
  roleUser: boolean;
  formErrors: {
    email: string;
    phone: string;
    password: string;
    birthDate: string;
  };
  emailValid: boolean;
  passwordValid: boolean;
  phoneValid: boolean;
  birthDateValid: boolean;
}

export class CreateUserPage extends React.Component<{}, CreateState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      birthDate: new Date(),
      birthDateString: "",
      email: "",
      password: "",
      roleAdmin: false,
      roleUser: false,
      formErrors: {
        email: "",
        phone: "",
        password: "",
        birthDate: ""
      },
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      birthDateValid: false
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
    const birthDate = this.state.birthDateString;

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
      birthDate,
      this.state.formErrors,
      this.state.birthDateValid
    );
    this.setState({
      formErrors: isEmailValid.formErrors,
      emailValid: isEmailValid.emailValid,
      passwordValid: isPasswordValid.passwordValid,
      phoneValid: isPhoneValid.phoneValid,
      birthDateValid: isBirthDateValid.birthDateValid
    });
    this.setState({
      formErrors: isPhoneValid.formErrors,
    });
    this.setState({
      formErrors: isBirthDateValid.formErrors,
    });
    this.setState({
      formErrors: isPasswordValid.formErrors,
    });
    this.willCreate();
  };

  private async willCreate() {
    
    var data = {
      name:this.state.name,
      email:this.state.email,
      phone:this.state.phone,
      birthDate:this.state.birthDateString,
      password:this.state.password,
      role: this.state.roleAdmin ? 'admin' : 'user'
    }

    const emailValid = this.state.emailValid;
    const passwordValid = this.state.passwordValid;
    const phoneValid = this.state.phoneValid;
    const birthDateValid = this.state.birthDateValid;
    if (
      emailValid &&
      phoneValid &&
      birthDateValid &&
      passwordValid
    ) {
      try {
        await mutateCreatUser(
          data
        );
        changeURL("/userList");
      } catch (error) {
        const message =
          error.graphQLErrors?.[0]?.message || "Não foi possível criar";
        alert(message);
      }
    }
  }

  private toggleRadioUser = () => {
    this.setState({ roleUser: !this.state.roleUser });
  }

  private toggleRadioAdmin = () => {
    this.setState({ roleAdmin: !this.state.roleAdmin });
  }

  private handlebirthDate= (event) => {
    const dateString = event.target.value;
    this.setState({
      birthDateString: dateString,
    });
  }

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
              type="radio"
              name="role"
              className="roleInput"
              onChange={this.toggleRadioUser}
            ></input>
            <p className="labelRole">User</p>
            <input
              type="radio"
              name="role"
              className="roleInput"
              onChange={this.toggleRadioAdmin}
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
