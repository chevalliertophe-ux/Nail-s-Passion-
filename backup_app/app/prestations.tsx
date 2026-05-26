import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Prestations() {
  const services = [
    { name: "Pose complète gel", price: "60€" },
    { name: "Remplissage gel", price: "40€" },
    { name: "Pose semi-permanent", price: "25€" },
    { name: "Nail Art", price: "5€" },
    { name: "Dépose", price: "15€" },
    { name: "Manucure", price: "20€" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prestations</Text>

      {services.map((item, index) => (
        <View key={index} style={styles.card}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>Tarif administrateur</Text>
          </View>

          <Text style={styles.price}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 70,
  },
  title: {
    color: "#f5d0dc",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#caa3ad",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  desc: {
    color: "#999",
    marginTop: 4,
  },
  price: {
    color: "#f5d0dc",
    fontSize: 24,
    fontWeight: "bold",
  },
});

