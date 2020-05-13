import * as React from "react";
import "./UserScreenPage.css";

interface UserScreenState{
    name:string;
    phone:string;
    birthDate:Date;
    email:string;
    roleAdmin:boolean;
    roleUser:boolean;
}



export class UserScreenPage extends React.Component<{},UserScreenState>{

  constructor(props){
      super(props);
      this.state = {
        name:"",
        phone:"",
        birthDate:new Date(""),
        email:"",
        roleAdmin:false,
        roleUser:false
      }
  }

  private handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value } as any);
  };

  private handleButtonClick = () => {
    console.log("botao foi clicado")
  };

  render() {
    return(
        <div>
            <h1 className="h1NewUser">Crie um novo usuario!</h1>
            <form className="formsBig">
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
                    <label htmlFor="bithdate">Data de aniversário</label>
                </div>
                <input
                    type="date"
                    name="bithdate"
                    className="bithdateInput"
                    value={this.state.birthDate.getDate()}
                    onChange={this.handleUserInput}
                ></input>
              </div>
              <div className="formsChild">
                <div className="span">
                    <label htmlFor="phone">Celular</label>
                </div>
                <input
                    type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  className="telInput" 
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
                    value={"User"}
                    onChange={this.handleUserInput}
                ></input>
                <p className="labelRole" >User</p>
                <input
                    type="checkbox"
                    name="roleAdmin"
                    className="roleInput"
                    value={"Admin"}
                    onChange={this.handleUserInput}
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