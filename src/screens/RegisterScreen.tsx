import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { LogoTitle } from '../components/title';
import { REGISTER_MUTATION } from '../graphql/userMutations';
import { useAuth } from "../utils/AuthContext";

export const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: async (data) => {
      try {
        await signIn(data.Register);
      } catch (e) {
        console.error('Sign in failed after registration', e);
        Alert.alert('Error', 'Failed to sign in after registration.');
      }
    },
    onError: (e) => {
      console.error('Registration failed', e);
      Alert.alert('Error', 'Registration failed.');
    }
  });

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          username,
          email,
          password,
        },
      });
    } catch (e) {
      console.error('Error executing register mutation', e);
    }
  };

  return (
    <View style={styles.container}>
      <LogoTitle/>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#666"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {loading && <Text style={styles.text}>Loading...</Text>}
      {error && <Text style={styles.text}>Error: {error.message}</Text>}
      <Button
        title="Already have an account? Log In"
        onPress={() => navigation.replace('Login')}
        color="black" 
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
