import React from "react";
import "./UserListPage.css";
import * as UserListIntegration from "../UserListIntegration";
import InfiniteScroll from "react-infinite-scroller";

interface UserModelState {
  users: {
    id: String;
    name: string;
    email: string;
  }[];
  count: number;
  offset: number;
  limit: number;
  hasNextPage: boolean;
  isLoading: boolean;
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
      hasNextPage: true,
      isLoading: false,
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
        count: userList.data.users.count,
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
      this.setState({ limit: this.state.limit + 10 });
      const moreUserList = await UserListIntegration.queryUserList(
        this.state.offset,
        this.state.limit
      );
      this.setState({
        users: moreUserList.data.users.nodes,
        hasNextPage: moreUserList.data.users.pageInfo.hasNextPage,
        isLoading: moreUserList.loading,
      });
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
          loadMore={this.fetchMoreData}
          initialLoad={false}
          hasMore={!this.state.isLoading && this.state.hasNextPage}
          loader={
            <h4
              style={{
                textAlign: "center",
                color: "white",
                paddingBottom: "10%",
              }}
            >
              Carregando...
            </h4>
          }
        >
          {users.map(this.handleUserCard)}
        </InfiniteScroll>
      </div>
    );
  }
}
