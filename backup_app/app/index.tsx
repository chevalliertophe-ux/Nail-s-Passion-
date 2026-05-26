import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const cards = [
    {
      title: "Prestations",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      route: "/prestations",
    },
    {
      title: "Galerie",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      route: "/galerie",
    },
    {
      title: "Agenda",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db",
      route: "/agenda",
    },
    {
      title: "Clientes",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      route: "/clientes",
    },
    {
      title: "WhatsApp",
      image:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432",
      route: "/whatsapp",
    },
    {
      title: "Formation",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      route: "/instagram",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nail's Passion</Text>
      <Text style={styles.subtitle}>Luxury Admin Studio</Text>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(card.route as any)}
          >
            <Image source={{ uri: card.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.cardText}>{card.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 70,
  },
  title: {
    color: "#f5d0dc",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#d7b6c0",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 40,
  },
  card: {
    width: "42%",
    height: 170,
    margin: 10,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#caa3ad",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});
