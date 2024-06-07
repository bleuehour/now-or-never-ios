import { useMutation, useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DELETE_USER } from "../graphql/userMutations";
import { GET_ME } from "../graphql/userQueries";
import { useAuth } from "../utils/AuthContext";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(GET_ME);


  const { signOut } = useAuth();
  const [deleteAcc, { loading: deleteLoading, error }] = useMutation(
    DELETE_USER,
    {
      onCompleted: async () => {
        await signOut();
      },
    }
  );

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteAcc(), style: "destructive" },
      ]
    );
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", paddingTop: 10 }}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{data && data.me ? data.me.username ?? "name" : "name"}</Text>
          <Text style={styles.infoText}>{data && data.me ? data.me.email ?? "email" : "email"}</Text>

              </View>


          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.button}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        </View>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  infoBox: {
    alignSelf: "center",
    padding: 30,
    borderRadius: 5,
    margin: 10,
    width: "100%",
    borderBottomColor:"black",
    borderColor:"black",
    borderBottomWidth:1
  },
  infoText: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    elevation: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    textAlign: "left",
  },
  navbar: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
  },
  navbarTitle: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  separator:{
    borderColor: "black",
    borderWidth:1
  }
});
