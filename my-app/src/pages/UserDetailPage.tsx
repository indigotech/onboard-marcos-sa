import React from "react";
import "./UserDetailPage.css";
import {queryUserDetail} from "../UserDetailQuery";

interface userRole{
    admin:boolean;
    user:boolean;
}

interface UserDetail{   
    name:string;
    phone:string;
    birthDate:Date;
    birthDateString:String;
    email:string;
    role:userRole;
    roleString:string;
}

export class UserDetailPage extends React.Component<{},UserDetail>{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            phone:"",
            birthDate:new Date(),
            birthDateString:"",
            email:"",
            role:{admin:false, user:false},
            roleString:""
        }
    }

    private async getUserDetail() {

      try {
          const splitedUrl = window.location.pathname.split('/')
          const id = splitedUrl[splitedUrl.length - 1]
          const userDetail = await queryUserDetail(
            id
          );
          
          this.setState({
            name: userDetail.data.user.name,
            phone: userDetail.data.user.phone,
            birthDate: userDetail.data.user.birthDate,
            email: userDetail.data.user.email,
            role: userDetail.data.user.role,
            birthDateString:userDetail.data.user.birthDate.toLocaleString(),
            roleString:JSON.stringify(userDetail.data.user.role)
          });
        } catch (error) {
          const message = error.graphQLErrors?.[0]?.message || "Falha na conexão";
          alert(message);
        }
      }


      componentDidMount() {
        this.getUserDetail();
      }

    render(){
        const { name } = this.state;
        const { phone } = this.state;
        const { birthDateString } = this.state;
        const { email } = this.state;
        const { roleString } = this.state;
        return(
            <div>
            <h1>Perfil do usuário</h1>
            <div className="card" >
        <div className="container">
          <p>Nome: {name} </p>
          <p> E-mail: { email }</p>
          <p> Telefone: { phone }</p>
          { <p> Data de nascimento: { birthDateString }</p> }
          <p> Papel: { roleString }</p>
        </div>
      </div>
      </div>
        )
    }
}