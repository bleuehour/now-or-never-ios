import { useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { DisplayFriends } from "../components/displayFriends";
import FriendNavbar from "../components/friendNavbar";
import { GET_MY_CONFIRMED_FRIENDS } from "../graphql/friendQueries";
import { GET_ME } from "../graphql/userQueries";

export default function FriendScreen({ navigation }) {
  const { data: friendsData, loading: loadingFriends, refetch } = useQuery(GET_MY_CONFIRMED_FRIENDS);
  const { loading, error, data, refetch:refetchMe } = useQuery(GET_ME);


  return (
    <>
      <FriendNavbar navigation={navigation} />
      
      <View style={styles.container}>
      
        
        {loadingFriends ? (
          <ActivityIndicator size="small" color="black" style={{ marginTop: 20 }} />
        ) : (
          <>
          <View style={styles.FriendItem}>
              <View style={styles.leftSide}>
                <Text style={styles.FriendText}>
                  {data?.me?.username ?? "Name"}
                </Text>
              </View>
              <View style={styles.rightSide}>
                <Text style={styles.FriendText}>{data?.me?.streak ?? "?"}</Text>
              </View>
            </View>
          <DisplayFriends data={friendsData} refetch={refetch} refetchSelfData={refetchMe} />
          
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 14,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlightedUser: {
    backgroundColor: "#00e1ff", 
  },
  highlightedUserText: {
    fontSize: 16,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSide: {},
  FriendText: {
    fontSize: 16,
  },
  FriendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
