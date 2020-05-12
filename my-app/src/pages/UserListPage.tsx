import React from 'react';
import './UserListPage.css';
import * as UserListIntegration from '../UserListIntegration';
import { UserModel } from '../Users.model';



export class UserListPage extends React.Component<{},UserModel>{
    
    
    offset:Number;
    limit:Number;

    constructor(props,offset,limit){
        super(props);
        this.offset = offset = 0
        this.limit = limit = 10
        this.getUserList = this.getUserList.bind(this);
        this.state = {
            users: {nodes:[{id:'',email:'',name:''}]}
        }
    }
     async getUserList ()  {
        try{
            const userList = await UserListIntegration.queryUserList(this.offset,this.limit);
            this.setState({users:userList.data.users})
        }catch(error){
            const message = error.graphQLErrors?.[0]?.message || 'Falha na conexão';
            alert(message);
        }
    }

    componentDidMount() {
        this.getUserList()
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

    render() {
        const { nodes } = this.state.users
        return( 
            <div>
                {nodes.map(this.handleUserCard)}            
        </div>    
        )
    }
}
