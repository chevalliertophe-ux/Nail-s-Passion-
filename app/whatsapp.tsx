import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

export default function Whatsapp() {
  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 WhatsApp</Text>

      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Text style={styles.buttonText}>Ouvrir WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#25D366",
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
