import * as React from "react";
import "./LoginPage.css";
import { FormErrors } from "./FormsErrors";
import * as Authentication from "../Authentication";
import * as Validation from "../Validation";

interface LoginPageState {
  email: string;
  password: string;
  formErrors: { email: string; password: string };
  emailValid: boolean;
  passwordValid: boolean
}

export class LoginPage extends React.Component<{}, LoginPageState> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false
    };
  }

  private handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value } as any);
  };

  private handleButtonClick = () => {
    const email = this.state.email;
    const password = this.state.password;

    const isEmailValid = Validation.validateEmail(email, this.state.formErrors, this.state.emailValid);
    const isPasswordValid = Validation.validatePassword(password, this.state.formErrors, this.state.passwordValid);
    this.setState({
      formErrors: isEmailValid.formErrors,
      emailValid: isEmailValid.emailValid,
      passwordValid: isPasswordValid.passwordValid
    });
    this.setState({
      formErrors: isPasswordValid.formErrors
    });
    this.willLogin();
  };

  private async willLogin() {
    if (this.state.emailValid && this.state.passwordValid) {
      try {
        await Authentication.login(this.state.email, this.state.password);
      } catch (error) {
        const message =
          error.graphQLErrors?.[0]?.message || "Erro na conexão com servidores";
        alert(message);
      }
    }
  }

  render() {
    return (
      <div className="page">
        <div className="login">
          <h1>Entrar na Taqtile</h1>
          <form className="forms">
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className="emailform">
              <div className="emailspan">
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                name="email"
                className="email"
                value={this.state.email}
                onChange={this.handleUserInput}
              ></input>
            </div>
            <div className="pwform">
              <div className="pwspan">
                <label htmlFor="password">Senha</label>
              </div>
              <input
                type="password"
                name="password"
                className="password"
                value={this.state.password}
                onChange={this.handleUserInput}
              ></input>
            </div>
            <button
              type="button"
              className="loginbt"
              onClick={this.handleButtonClick}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
