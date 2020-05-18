import React from "react";
import "./UserDetailPage.css";
import { queryUserDetail, userRole } from "../UserDetailQuery";

interface UserDetailPageState {
  name: string;
  phone: string;
  birthDate: Date;
  email: string;
  role: userRole;
}

export class UserDetailPage extends React.Component<{}, UserDetailPageState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      birthDate: new Date(),
      email: "",
      role: { admin: false, user: false }
    };
  }

  private async getUserDetail() {
    try {
      const splitedUrl = window.location.pathname.split("/");
      const id = splitedUrl[splitedUrl.length - 1];
      const userDetail = await queryUserDetail(id);

      this.setState({
        name: userDetail.data.user.name,
        phone: userDetail.data.user.phone,
        birthDate: userDetail.data.user.birthDate,
        email: userDetail.data.user.email,
        role: userDetail.data.user.role
      });
    } catch (error) {
      const message = error.graphQLErrors?.[0]?.message || "Falha na conexão";
      alert(message);
    }
  }

  componentDidMount() {
    this.getUserDetail();
  }

  render() {
    const birthDate = this.state.birthDate.toLocaleString()
    const { name } = this.state;
    const { phone } = this.state;
    const { email } = this.state;
    const roleString = JSON.stringify(this.state.role);

    return (
      <div>
        <h1>Perfil do usuário</h1>
        <div className="card">
          <div className="container">
            <p>Nome: {name} </p>
            <p> E-mail: {email}</p>
            <p> Telefone: {phone}</p>
            {<p> Data de nascimento: {birthDate}</p>}
            <p> Papel: {roleString}</p>
          </div>
        </div>
      </div>
    );
  }
}
