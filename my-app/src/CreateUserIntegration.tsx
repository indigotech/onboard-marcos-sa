import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const CREATEUSER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: Date!
    $password: String!
    $role: UserRole!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        password: $password
        role: $role
      }
    ) {
      id
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

interface createUser {
  createUser: {
    id: String;
  };
}

export async function mutateCreatUser(
  name,
  email,
  phone,
  birthDate,
  password,
  roleAdmin,
  roleUser
) {
  if (roleAdmin == true) {
    const result = await client.mutate<createUser>({
      variables: {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
        password: password,
        role: "admin",
      },
      mutation: CREATEUSER_MUTATION,
    });
    return result;
  } else {
    const result = await client.mutate<createUser>({
      variables: {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
        password: password,
        role: "user",
      },
      mutation: CREATEUSER_MUTATION,
    });
    return result;
  }
}
