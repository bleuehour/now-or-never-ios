import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { DELETE_TODO, UPDATE_DONE, UPDATE_RECURRING } from "../graphql/todoMutations";
import { DisplayTodosProps } from "../types/types";

export const DisplayTodos: React.FC<DisplayTodosProps> = ({
  data,
  refetch,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const renderRightActions = (progress, dragX, id) => {
    const translateX = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 50],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          width: 50,
          height:"85%",
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX }],
          alignSelf:"center"

        }}
      >
        <TouchableOpacity style={{}} onPress={() => deleteTodoItem(id)}>
          <Text style={{ color: "white", }}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      refetch();
    } catch (error) {
    }
    setRefreshing(false);
  }, []);

  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_DONE);
  const [updateRecurring] = useMutation(UPDATE_RECURRING);

  const swipeRightAction = async (id) => {
    try {
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteTodoItem = async (id) => {
    try {
      await deleteTodo({
        variables: {
          id: id,
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateRe = async (id, isRecurring) => {
    try {
      await updateRecurring({
        variables: {
          id: id,
          isRecurring: isRecurring,
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  const onLongPressTodo = async (id, isComplete) => {
    try {
      await updateTodo({
        variables: {
          id: id,
          isComplete: isComplete,
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!data || !data.getTodos || data.getTodos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Add something to do today!</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1 }}
      >
        {data.getTodos.map((todo) => (
          <Swipeable
            key={todo.id}
            friction={4}
            rightThreshold={40}
            onSwipeableRightOpen={() => swipeRightAction(todo.id)}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, todo.id)
            }
          >
            <TouchableOpacity
              onPress={() => onLongPressTodo(todo.id, todo.isComplete)}
              style={styles.todoItem}
            >
              <View
                style={[
                  styles.circle,
                  { backgroundColor: todo.isComplete ? "gray" : "white" },
                ]}
              ></View>
              <Text style={styles.todoText}>{todo.text}</Text>
              <TouchableOpacity onPress={() => updateRe(todo.id, todo.isRecurring)}>
                <Text style={[styles.recurringIcon, { color: todo.isRecurring ? 'black' : 'black' }]}>
                {todo.isRecurring ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginTop: 8,
    width: "95%", 
    alignSelf: "center", 
    borderRadius: 8, 
  },
  recurringIcon: {
    marginRight: 10,
    fontSize: 24, 
    padding: 5, 
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
  },
});
