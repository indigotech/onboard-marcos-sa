import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const USERDETAIL_QUERY = gql`
  query QueryUser($id: ID!) {
    user(id: $id) {
      name
      phone
      birthDate
      email
      role
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

export interface userRole {
  admin: boolean;
  user: boolean;
}

interface userDetail {
  user: {
    name: string;
    phone: string;
    birthDate: Date;
    email: string;
    role: userRole;
  };
}

export async function queryUserDetail(id) {
  const result = await client.query<userDetail>({
    variables: { id: id },
    query: USERDETAIL_QUERY,
  });
  return result;
}
