import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { DisplayTodos } from "../components/displayTodos";
import { CREATE_TODOS } from "../graphql/todoMutations";
import { GET_TODOS } from "../graphql/todoQueries";
import { Todo } from "../types/types";

export default function HomeScreen() {
  const [createTodo, { loading: creating, error, reset }] = useMutation(
    CREATE_TODOS,
    {
      fetchPolicy: "no-cache",
    }
  );
  const [entry, setEntry] = useState("");

  const handleEntry = (text: string) => {
    setEntry(text);
  };

  const clear = () => {
    setEntry("");
  };

  const {
    loading: loadingTodos,
    error: errorLoadingTodos,
    data,
    refetch,
  } = useQuery<{ getTodos: Todo[] }>(GET_TODOS);

  return (
    <>
      <View style={{ flex: 1, backgroundColor:"#F8F8F8" }}>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          value={entry}
          onChangeText={handleEntry}
          placeholder="Add todo"
          keyboardType="default"
          textContentType="none"
          onSubmitEditing={async (event) => {
            try {
              let values = event.nativeEvent.text;
              await createTodo({
                variables: {
                  text: values,
                },
              });
              clear();
              refetch();
            } catch (error) {
            }
          }}
        />
        {loadingTodos ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{ marginTop: 20 }}
          />
        ) : (
          <DisplayTodos data={data} refetch={refetch} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    backgroundColor:"white",
  },
});
