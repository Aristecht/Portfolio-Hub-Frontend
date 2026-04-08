import { InMemoryCache } from "@apollo/client";
import { ApolloClient, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
