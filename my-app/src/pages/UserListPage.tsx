import React from "react";
import "./UserListPage.css";
import * as UserListIntegration from "../UserListIntegration";
import InfiniteScroll from "react-infinite-scroll-component";

interface UserModelState {
  users: {
    id: String;
    name: string;
    email: string;
  }[];
  count: number;
  offset: number;
  limit: number;
  hasNextPage: boolean
}

export class UserListPage extends React.Component<{}, UserModelState> {
  constructor(props) {
    super(props);
    this.getUserList = this.getUserList.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.state = {
      users: [{ id: "", email: "", name: "" }],
      count: 0,
      offset: 0,
      limit: 10,
      hasNextPage: true
    };
  }

  async getUserList() {
    try {
      const userList = await UserListIntegration.queryUserList(
        this.state.offset,
        this.state.limit
      );
      this.setState({
        users: userList.data.users.nodes,
        count: userList.data.users.count
      });
    } catch (error) {
      const message = error.graphQLErrors?.[0]?.message || "Falha na conexão";
      alert(message);
    }
  }

  componentDidMount() {
    this.getUserList();
  }

  handleUserCard({ id, name, email }) {
    return (
      <div className="card" key={id}>
        <div className="container">
          <p>Nome: {name} </p>
          <p> E-mail: {email} </p>
        </div>
      </div>
    );
  }
  async fetchMoreData() {
    try {
      console.log("OPA");
      console.log(this.state.limit);
      console.log(this.state.hasNextPage);
      this.setState({ limit: this.state.limit + 10 });
      const moreUserList = await UserListIntegration.queryUserList(
        this.state.offset,
        this.state.limit
      );
      console.log(moreUserList);
      setTimeout(() =>{
      this.setState({
        users: moreUserList.data.users.nodes,
        hasNextPage: moreUserList.data.users.pageInfo.hasNextPage
      });
      console.log(this.state.hasNextPage);
      console.log(this.state.limit);
    },1500);
    } catch (error) {
      console.log("Não foi possivel pegar mais dados...");
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.count}
          next={this.fetchMoreData}
          hasMore={this.state.hasNextPage}
          loader={<h4 style={{ textAlign: "center",color: "white" }}>Carregando...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Uhu! Você viu tudo!</b>
            </p>
          }
        >
          {users.map(this.handleUserCard)}
        </InfiniteScroll>
      </div>
    );
  }
}
