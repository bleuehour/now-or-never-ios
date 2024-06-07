import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/userQueries";

const Navbar: React.FC = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleRefetch = () => {
    refetch();
  };

  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  return (
    <View style={styles.navbar}>
      <View style={styles.navItem}>
        <Text style={styles.navText}>{currentDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
  },
  navItem: {
    flex: 1,
    flexDirection: "row", 
    paddingLeft: 20,
    alignItems: "center",
  },

  navText: {
    fontWeight: 'bold',
    fontSize: 20, 
    fontFamily: "Avenir",
  },
  smallNavItem: {
    flex: 0.19,
    justifyContent: "center",
    alignItems: "center",
  },
  smallNavText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
});

export default Navbar;
