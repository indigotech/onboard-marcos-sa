import * as React from "react";
import "./UserScreenPage.css";
import { FormErrors } from "./FormsErrors";
import * as Validation from "../Validation";

interface UserScreenState{
    name:string;
    phone:string;
    birthDate:Date;
    email:string;
    roleAdmin:boolean;
    roleUser:boolean;
    formErrors: { email: string;phone: string; birthDate:Date; checkbox:boolean};
    emailValid: boolean;
    phoneValid: boolean;
    birthDateValid:boolean;
    checkboxValid: boolean;
}



export class UserScreenPage extends React.Component<{},UserScreenState>{

  constructor(props){
      super(props);
      this.toggleCheckboxAdmin = this.toggleCheckboxAdmin.bind(this);
      this.toggleCheckboxUser = this.toggleCheckboxUser.bind(this);
      this.state = {
        name:"",
        phone:"",
        birthDate:new Date(),
        email:"",
        roleAdmin:false,
        roleUser:false,
        formErrors: { email: "", phone: "", birthDate:new Date(""),checkbox:false},
        emailValid: false,
        phoneValid: false,
        birthDateValid:false,
        checkboxValid: false
      }
  }

  private handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value } as any);
  };

  private handleButtonClick = () => {
    const email = this.state.email;
    const phone = this.state.phone;
    const birthDate = this.state.birthDate;
    const roleAdmin = this.state.roleAdmin;
    const roleUser = this.state.roleUser;

    const isEmailValid = Validation.validateEmail(email, this.state.formErrors, this.state.emailValid);
    const isPhone = Validation.validatePhone(phone, this.state.formErrors, this.state.phoneValid);
    const isBirthDate = Validation.validateBirthDate(birthDate, this.state.formErrors, this.state.birthDateValid);
    const isCheckbox = Validation.validateCheckbox(roleUser, roleAdmin ,this.state.formErrors, this.state.checkboxValid);
    this.setState({
      formErrors: isEmailValid.formErrors,
      emailValid: isEmailValid.emailValid,
      phoneValid: isPhone.phoneValid,
      birthDateValid: isBirthDate.birthDateValid,
      checkboxValid: isCheckbox.checkboxValid
    });
    this.setState({
      formErrors: isPhone.formErrors
    });
    this.setState({
      formErrors: isBirthDate.formErrors
    });
    this.setState({
      formErrors: isCheckbox.formErrors
    });
    this.willCreate();
  };
  
  private async willCreate() {
    const emailValid = this.state.emailValid;
    const phoneValid = this.state.phoneValid;
    const birthDateValid = this.state.birthDateValid;
    if (emailValid && phoneValid && birthDateValid){
      console.log("OI")
    }
  }

  private toggleCheckboxUser()  {
    this.setState({roleUser: !this.state.roleUser});
  }
  
  private toggleCheckboxAdmin()  {
    this.setState({roleAdmin: !this.state.roleAdmin});
  }

  render() {
    return(
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
                    className="nameInput"
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
                    className="emailInput"
                    value={this.state.email}
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
                    className="bithdateInput"
                    onChange={this.handleUserInput}
                ></input>
              </div>
              <div className="formsChild">
                <div className="span">
                    <label htmlFor="phone">Celular</label>
                </div>
                <input
                    type="tel" id="phone" name="phone" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"  className="telInput" 
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
                <p className="labelRole" >User</p>
                <input
                    type="checkbox"
                    name="roleAdmin"
                    className="roleInput"
                    onChange={this.toggleCheckboxAdmin}
                ></input>
                <p className="labelRole" >Admin</p>
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
    )
  }

}