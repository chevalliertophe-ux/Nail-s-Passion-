import { View, Text, StyleSheet } from "react-native";

export default function Plus() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Plus</Text>
      <Text style={styles.text}>
        Cette page sera personnalisée bientôt.
      </Text>
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
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#ddd",
  },
});
