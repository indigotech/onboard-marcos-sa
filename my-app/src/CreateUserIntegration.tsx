import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const CREATEUSER_MUTATION = gql`
  mutation CreateUserMutation(
    $data: UserInputType!
  ) {
    createUser(
      data:$data
    ) {
      id
    }
  }
`;

interface createUser {
  createUser: {
    id: String;
  };
}

interface UserInputType {
  name:string,
  email:string,
  phone:string,
  birthDate:string,
  password:string,
  role:string
}

export function mutateCreatUser(
  data:UserInputType
) {
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
  return client.mutate<createUser>({
      variables: {
        data
      },
      mutation: CREATEUSER_MUTATION,
    });
}
