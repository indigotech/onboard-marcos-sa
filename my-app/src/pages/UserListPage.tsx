import React from "react";
import "./UserListPage.css";
import * as UserListIntegration from "../UserListIntegration";
import InfiniteScroll from "react-infinite-scroller";
import { createBrowserHistory } from "history";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { changeURL } from "../ChangeUrl";


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

function loaderComponent() {
  return (
    <h4
      style={{
        textAlign: "center",
        color: "white",
      }}
    >
      Carregando...
    </h4>
  );
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

  private async getUserList() {
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

  private changeURL(id) {
    const history = createBrowserHistory();
    history.push("/userDetail/" + id);
    window.location.reload(false);
  }

  private HandleUserDetailButton = (event) => {
    this.changeURL(event.target.id);
  };

  private handleUserCard = ({ id, name, email }) => {
    return (
      <div className="card">
        <div
          className="container"
          id={id}
          key={id}
          onClick={this.HandleUserDetailButton}
        >
          <p>Nome: {name} </p>
          <p> E-mail: {email} </p>
        </div>
      </div>
    );
  };
  private async fetchMoreData() {
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

  private handleButtonClick(){
    changeURL("userScreen")
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
          loader={loaderComponent()}
        >
          {users.map(this.handleUserCard)}
        </InfiniteScroll>
        <div className="fab-wrap">
          <Fab onClick={this.handleButtonClick} size="medium" color="primary" aria-label="add" className="fab">
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}
