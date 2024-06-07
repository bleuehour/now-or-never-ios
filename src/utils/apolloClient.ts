import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("userToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const link = errorLink.concat(authLink).concat(httpLink);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
