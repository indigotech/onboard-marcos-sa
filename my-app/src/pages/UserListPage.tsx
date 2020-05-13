import React from 'react';
import './UserListPage.css';
import * as UserListIntegration from '../UserListIntegration';
import InfiniteScroll from "react-infinite-scroll-component";

interface UserModelState {
    users: {
      id:String;
      name: string;
      email: string;
    }[];
    count: number;
    pageInfo:{
        offset: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage:boolean;
    }
  };

export class UserListPage extends React.Component<{},UserModelState>{

    

    constructor(props){
        super(props);
        this.getUserList = this.getUserList.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.state = {
            users:[{id:'',email:'',name:''}],
            count: 0,
            pageInfo:{
              offset: 0,
              limit: 10,
              hasNextPage: false,
              hasPreviousPage:false
            }
        }
    }

     async getUserList ()  {
        try{
            const userList = await UserListIntegration.queryUserList(this.state.pageInfo.offset,this.state.pageInfo.limit);
            this.setState({users:userList.data.users.nodes})
        }catch(error){
            const message = error.graphQLErrors?.[0]?.message || 'Falha na conexão';
            alert(message);
        }
    }

    componentDidMount() {
        this.getUserList()
        this.state.users.concat(this.state.users)
         };

    handleUserCard({ id, name, email }) {
        return (
          <div className="card" key={id}>
            <div className="container"> 
              <p >Nome: {name} </p>
              <p> E-mail: {email} </p>
            </div>      
          </div>
        )
      }
    async fetchMoreData  () {
      try{
        const moreUserList = await UserListIntegration.queryUserList(this.state.pageInfo.offset,this.state.pageInfo.limit);
        setTimeout(() => {
            this.setState(
                {
                users: moreUserList.data.users.nodes.concat()
              });
           console.log(this.state.count)
           console.log(this.state.pageInfo.hasNextPage)
           console.log(this.state.pageInfo.limit)
        }, 1500);
    }catch(error){
        console.log("Não foi possivel pegar mais dados...")
    }
    }


    render() {
        const { users } = this.state
        return( 
            <div>    
                <InfiniteScroll
                dataLength={this.state.count}
                next={this.fetchMoreData}
                hasMore={this.state.pageInfo.hasNextPage}
                loader={<h4 style={{textAlign: 'center'}}>Loading...</h4>}
                >
                    {users.map(this.handleUserCard)}
                </InfiniteScroll>
            </div>  
        )
    }
}
