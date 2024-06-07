import { Text, View,StyleSheet } from "react-native";

export const LogoTitle = () => {
    return (
      <>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>N</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>o</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>w</Text>
        <View style={{width: 5}} /> 
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>o</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>r</Text>
        <View style={{width: 5}} /> 
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>N</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>e</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>v</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>e</Text>
        <Text style={[styles.logoText, {transform: [{translateY: -100}]}]}>r</Text>
      </View>
      </>
    );
  };

  const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      },
      logoText: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
      },
  })

