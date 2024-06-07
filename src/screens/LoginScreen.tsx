import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { LogoTitle } from '../components/title';
import { LOGIN_MUTATION } from '../graphql/userMutations';
import { useAuth } from "../utils/AuthContext";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      try {
        await signIn(data.Login);
      } catch (e) {
        console.error('Sign in failed after login', e);
        Alert.alert('Error', 'Failed to sign in after login.');
      }
    },
    onError: (e) => {
      console.error('Login failed', e);
      Alert.alert('Error', 'Login failed.');
    }
  });

  const handleLogin = async () => {
    try {
      await login({
        variables: {
          email,
          password,
        },
      });
    } catch (e) {
      console.error('Error executing login mutation', e);
    }
  };

  return (
    <View style={styles.container}>
      <LogoTitle />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {loading && <Text style={styles.text}>Loading...</Text>}
      {error && <Text style={styles.text}>Error: {error.message}</Text>}
      <Button
        color="black"
        title="Don't have an account? Register"
        onPress={() => navigation.replace('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default LoginScreen;
