import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { UserModel } from "./Users.model";

const USERS_QUERY = gql`
  query UserList($offset: Int!, $limit: Int!) {
    users(pageInfo: { offset: $offset, limit: $limit }) {
      nodes {
        id
        name
        email
      }
      count
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const token = localStorage.getItem(AUTH_TOKEN);

const httpLink = createHttpLink({
  uri: "https://tq-template-server-sample.herokuapp.com/graphql",
  headers: {
    Authorization: token,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export async function queryUserList(offset, limit) {
  const result = await client.query<UserModel>({
    variables: { offset: offset, limit: limit },
    query: USERS_QUERY,
  });
  return result;
}
