import * as React from 'react';
import './LoginPage.css';
import { render } from '@testing-library/react';
import { FormErrors } from "./FormsErrors";

interface LoginStates {
    email: string;
    password: string;
    formErrors: {email:string, password: string};
    emailValid: boolean,
    passwordValid: boolean,
    formValid: boolean,
    ClickValid: boolean,
}

class LoginPage extends React.Component<{},LoginStates> {

    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false,
          ClickValid: false,
        }
      }

      handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}as any);
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }
      
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid  ? '' : 'Email não é válido';
            break;
          case 'password':
            passwordValid = value.length >= 7 && value.match(/^(?=.*[a-z])(?=.*[0-9])/);
            fieldValidationErrors.password = passwordValid ? '': 'Senha necessita de, pelo menos, um número e uma letra';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
          }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }

      private ShowError = () =>{
        
        const email = this.state.email;
        const password = this.state.password;

        this.validateField('email', email);
        this.validateField('password', password);
      }

    render() {
    return(
        <div className="page"> 
        <div className="login">
            <h1>
            Entrar na Teqtile
            </h1>
            <form className="forms">
                <div className="panel panel-default">
    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="emailform">
                    <div className="emailspan"><label htmlFor="email">Email</label></div>
                    <input type="email" name="email" className="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)}></input>
                </div>
                <div className="pwform">
                    <div className="pwspan"><label htmlFor="password">Senha</label></div>
                    <input type="password" name="password" className="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)}></input>
                </div>
            <button type="button" className="loginbt" onClick={this.ShowError}>Entrar</button>
            </form>
        </div>
    </div>   

    );
    }
}


export default LoginPage;