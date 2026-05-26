import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
        }}
        style={styles.hero}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Nail's Passion</Text>

        <Text style={styles.subtitle}>
          Beauté • Luxe • Élégance
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Réserver maintenant
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>
        Prestations Premium
      </Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200",
          }}
          style={styles.cardImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Pose Gel Luxe</Text>
          <Text style={styles.cardPrice}>25€</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200",
          }}
          style={styles.cardImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Nail Art Premium</Text>
          <Text style={styles.cardPrice}>40€</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200",
          }}
          style={styles.cardImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Manucure Glow</Text>
          <Text style={styles.cardPrice}>30€</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Nail's Passion • Premium Studio
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  hero: {
    width: "100%",
    height: 420,
  },

  overlay: {
    marginTop: -120,
    paddingHorizontal: 25,
  },

  title: {
    color: "#ff1493",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#ff1493",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },

  subtitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 30,
    letterSpacing: 1,
  },

  button: {
    backgroundColor: "#ff1493",
    marginHorizontal: 25,
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    shadowColor: "#ff1493",
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  section: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 25,
    marginLeft: 20,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 28,
    marginHorizontal: 20,
    marginBottom: 28,
    overflow: "hidden",
    shadowColor: "#ff1493",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },

  cardImage: {
    width: "100%",
    height: 220,
  },

  cardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardPrice: {
    color: "#ff1493",
    fontSize: 24,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 30,
    marginBottom: 60,
    alignItems: "center",
  },

  footerText: {
    color: "#777",
    fontSize: 16,
  },
});
