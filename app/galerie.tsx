import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function Admin() {
  const [code, setCode] = useState("");
  const ADMIN_CODE = "0712";

  const login = () => {
    if (code === ADMIN_CODE) {
      Alert.alert(
        "Accès administrateur",
        "Mode admin activé ✅"
      );
    } else {
      Alert.alert(
        "Erreur",
        "Code incorrect"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mode Administrateur</Text>

      <Text style={styles.subtitle}>
        Accès sécurisé Nail's Passion
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Code admin"
        placeholderTextColor="#999"
        secureTextEntry
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    color: "#E6B7C2",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    marginBottom: 30,
    fontSize: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 18,
    padding: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#E6B7C2",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E6B7C2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 16,
  },
});
