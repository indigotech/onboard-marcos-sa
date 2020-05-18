import { AUTH_TOKEN } from "./constants";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export function client(){
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
    return client
}
