import { ApolloProvider } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AppNavigator from "./src/navigator/AppNavigator";
import LoginNavigator from "./src/navigator/LoginNavigator";
import { AuthProvider, useAuth } from "./src/utils/AuthContext";
import { client } from "./src/utils/apolloClient";



const AppContent = () => {
  const { user } = useAuth();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
      {user ? <AppNavigator/>  : <LoginNavigator />}
    </SafeAreaView>
  );
};

function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <NavigationContainer theme={navTheme}>
          <AppContent />
        </NavigationContainer>
       </ApolloProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});

export default App