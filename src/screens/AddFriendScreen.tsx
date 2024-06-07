import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ACCEPT_FRIEND,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from "../graphql/friendMutations";
import { GET_MY_RECIEVED_INVITES, GET_USERS } from "../graphql/friendQueries";

const AddFriendScreen = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState("");
  const [
    searchUsers,
    { called, loading, data: searchData, error: searchError,refetch },
  ] = useLazyQuery(GET_USERS);
  const {
    data: confirmedFriendsData,
    loading: confirmedFriendsLoading,
    error: confirmedFriendsError,
    refetch:reinv, 
  } = useQuery(GET_MY_RECIEVED_INVITES);

  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [acceptFriend] = useMutation(ACCEPT_FRIEND);


  const dataToDisplay = inputValue
    ? searchData?.searchUsers ?? []
    : confirmedFriendsData?.myReceivedInvites ?? [];

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text) {
      searchUsers({
        variables: { username: text },
      });
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      await addFriend({ variables: { friendId } });
      refetch()
    } catch (error) {
    }
  };

  const handleAcceptFriend = async (friendId) => {
    try {
      await acceptFriend({ variables: { friendId } });
      reinv()
    } catch (error) {
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({ variables: { friendId } });
      reinv()
    } catch (error) {
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", paddingTop: 10 }}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Add Friend</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navbarIcon}
        >
          <AntDesign name="down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Search by username"
          keyboardType="default"
          textContentType="none"
          onChangeText={handleInputChange}
          placeholderTextColor="gray"
        />
        <Text style={styles.title}>
          {inputValue ? "Search Results" : "Invites"}
        </Text>

        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          {dataToDisplay.map((user) => (
            <View key={user.id} style={styles.todoItem}>
              <Text style={styles.todoText}>{user.username}</Text>
              {inputValue ? (
                <>
                  <Button
                    title="Add Friend"
                    onPress={() => handleAddFriend(user.id)}
                  />
                  <Button
                    title="Remove Friend"
                    onPress={() => handleRemoveFriend(user.id)}
                  />
                </>
              ) : (
                <>
                  <Button
                    title="Accept Request"
                    onPress={() => handleAcceptFriend(user.id)}
                  />
                  <Button
                    title="Decline Request"
                    onPress={() => handleRemoveFriend(user.id)}
                  />
                </>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
  },
  navbarIcon: {},
  navbarTitle: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  input: {
    height: 45,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "white",
  },
  title: {
    marginLeft: 12,
    marginTop: 4,
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    marginHorizontal: 0,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
});

export default AddFriendScreen;
