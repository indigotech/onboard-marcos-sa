import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createBrowserHistory } from "history";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;

const httpLink = createHttpLink({
  uri: "https://tq-template-server-sample.herokuapp.com/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const history = createBrowserHistory();

interface Result {
  login: {
    token: String;
    user: {
      id: String;
      name: String;
      email: String;
    };
  };
}

export async function login(email, password): Promise<void> {
  const result = await client.mutate<Result>({
    variables: { email: email, password: password },
    mutation: LOGIN_MUTATION,
  });

  const token = result.data?.login?.token;
  saveUserData(token);
  changeURL();
}

function saveUserData(token) {
  localStorage.setItem(AUTH_TOKEN, token);
}

function changeURL() {
  history.push("/userList");
  window.location.reload(false);
}
