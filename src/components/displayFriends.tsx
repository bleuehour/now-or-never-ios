import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const DisplayFriends: React.FC<any> = ({ data, refetch }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      refetch();
    } catch (error) {
    }
    setRefreshing(false);
  }, []);

  if (!data || !data.myConfirmedFriends) {
    return <View style={styles.centeredView}></View>;
  }
  return (
    <View style={styles.container}>
      

      <ScrollView
      keyboardShouldPersistTaps='handled'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1 }}
      >
        {data.myConfirmedFriends.map((friend, index) => {


          return (
            <View style={styles.FriendItem} key={index}>
              <View style={styles.leftSide}>
                <Text style={styles.FriendText}>
                  {friend.username}
                </Text>
              </View>
              <View style={styles.rightSide}>
                <Text style={styles.FriendText}>{friend.streak}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
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
