import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const checkLogin = () => {
    if (password === "nailadmin2025") {
      router.push("/admin");
    } else {
      Alert.alert("Accès refusé");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin sécurisé</Text>

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={checkLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#000",
    justifyContent:"center",
    alignItems:"center",
    padding:30
  },
  title:{
    color:"#efbfd0",
    fontSize:32,
    marginBottom:30,
    fontWeight:"700"
  },
  input:{
    width:"100%",
    backgroundColor:"#111",
    borderWidth:1,
    borderColor:"#efbfd0",
    borderRadius:18,
    padding:16,
    color:"#fff",
    marginBottom:20
  },
  button:{
    backgroundColor:"#efbfd0",
    width:"100%",
    padding:18,
    borderRadius:20,
    alignItems:"center"
  },
  buttonText:{
    color:"#111",
    fontSize:18,
    fontWeight:"700"
  }
});
