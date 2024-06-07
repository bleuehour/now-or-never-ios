import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/userQueries";

const SettingsNavbar: React.FC<{ navigation: any }> = ({ navigation }) => { 
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const streak = data && data.me ? data.me.streak ?? 0 : 0;

  return (
    <View style={styles.navbar}>
      <Text style={styles.navText}>My Friends</Text>
      <View style={styles.iconsContainer}>
        <Text style={styles.streakText}>{streak}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddFriendScreen')}
          style={styles.iconTouchArea}
        >
          <Icon name="plus" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsScreen')}
          style={styles.iconTouchArea}
        >
          <Icon name="bars" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    alignItems: 'center',
    justifyContent: 'space-between', 
    flexDirection: 'row',
    backgroundColor: '#F8F8F8', 
    height: 60,
    borderBottomColor: '#D1D1D1',
    shadowColor: '#D1D1D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10, 
    borderBottomWidth: 2,
  },
  navText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'black',
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
  },
  streakText: {
    fontSize: 18,
  },
  iconTouchArea: {
    minWidth: 40,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default SettingsNavbar;
