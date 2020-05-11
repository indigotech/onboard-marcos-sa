import * as React from 'react';
import { AUTH_TOKEN } from './constants';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createBrowserHistory } from 'history';

const LOGIN_QUERY = gql`
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

const history = createBrowserHistory();

interface Result {
    users: {
      nodes: {
          name:String;
          email:String;
      }
    }
  }

export async function queryUserList(offset, limit){
    const result = await client.query<Result>({
        variables:{ offset:offset, limit:limit },
        query: LOGIN_QUERY          
      });
      
}