import { AUTH_TOKEN } from './constants';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!){
  login(data:{email: $email, password: $password}){
    token
  }
}
`

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


class Authentication  {
    constructor(){
    }
    public result:any;
    login(email, password) {
        client.mutate({
          variables:{ email:email, password:password },
          mutation: LOGIN_MUTATION          
        })
        .then(result => { 
          this.storeToken(result.data)
          console.log(result.data)
         })
        .catch(error => { console.log(error) });
      }
    
      storeToken (data) {
        const { token } = data.login
        this.saveUserData(token)
      }
    
      saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
        console.log(localStorage)
      }

}



export default Authentication;