import * as React from "react";
import "./CreateUserPage.css";
import { FormErrors } from "./FormsErrors";
import * as Validation from "../Validation";
import { mutateCreatUser } from "../CreateUserIntegration";
import { changeURL } from "../ChangeUrl";

interface CreateState {
  roleAdmin: boolean;
  roleUser: boolean;
  formErrors: {
    email: string;
    phone: string;
    password: string;
    birthDate: string;
  };
}

export class CreateUserPage extends React.Component<{}, CreateState> {
  constructor(props) {
    super(props);
    this.state = {
      roleAdmin: false,
      roleUser: false,
      formErrors: {
        email: "",
        phone: "",
        password: "",
        birthDate: ""
      }
    };
  }

  private handleButtonClick = (event) => {
    event.preventDefault();
    const name = event.target.name.value
    const email = event.target.email.value
    const phone = event.target.phone.value
    const password = event.target.password.value
    const birthDate = event.target.birthDate.value

    const isEmailValid = Validation.validateEmail(
      email,
      this.state.formErrors
    );
    const isPhoneValid = Validation.validatePhone(
      phone,
      this.state.formErrors
    );
    const isPasswordValid = Validation.validatePassword(
      password,
      this.state.formErrors
    );
    const isBirthDateValid = Validation.validateBirthDate(
      birthDate,
      this.state.formErrors
    );
    this.setState({
      formErrors: isBirthDateValid.formErrors && isPasswordValid.formErrors && isPhoneValid.formErrors && isEmailValid.formErrors
    });
    this.willCreate(name, email, phone, birthDate, password);
   };

  private async willCreate(name, email, phone, bithDate, password) {
    const stringDate = bithDate.toString()
    const roleAdmin = this.state.roleAdmin
    var data = {
      name:name,
      email:email,
      phone:phone,
      birthDate:stringDate,
      password:password,
      role: roleAdmin ? 'admin' : 'user'
    }

    const emailValid = this.state.formErrors.email.match("");
    const passwordValid = this.state.formErrors.password.match("");
    const phoneValid = this.state.formErrors.phone.match("");
    const birthDateValid = this.state.formErrors.birthDate.match("");
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

  render() {
    return (
      <div>
        <h1 className="h1NewUser">Crie um novo usuario!</h1>
        <form className="formsBig"
        onSubmit={this.handleButtonClick}
        >
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
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="birthdate">Data de aniversário</label>
            </div>
            <input
              type="date"
              name="birthDate"
              className="Input"
            ></input>
          </div>
          <div className="formsChild">
            <div className="span">
              <label htmlFor="phone">Celular</label>
            </div>
            <input
              type="tel"
              name="phone"
              className="Input"
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
            type="submit"
            className="loginbt"
          >
            Criar usuário
          </button>
        </form >
      </div>
    );
  }
}
