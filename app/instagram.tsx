import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

export default function Instagram() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instagram</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://instagram.com")}
      >
        <Text style={styles.buttonText}>Ouvrir Instagram</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
