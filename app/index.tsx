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
          uri: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200",
        }}
        style={styles.hero}
      />

      <View style={styles.overlay}>
        <Text style={styles.logo}>Nail’s Passion</Text>

        <Text style={styles.subtitle}>
          Beauté • Élégance • Onglerie Premium
        </Text>

        <Text style={styles.title}>
          La beauté est notre passion ✨
        </Text>

        <TouchableOpacity style={styles.buttonPink}>
          <Text style={styles.buttonText}>
            Réserver maintenant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDark}>
          <Text style={styles.buttonText}>
            Nous contacter
          </Text>
        </TouchableOpacity>

        <Text style={styles.section}>
          Nos Prestations
        </Text>

        <View style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
            }}
            style={styles.cardImage}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Pose Gel
            </Text>

            <Text style={styles.cardPrice}>
              25€
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200",
            }}
            style={styles.cardImage}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Nail Art
            </Text>

            <Text style={styles.cardPrice}>
              15€
            </Text>
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
            <Text style={styles.cardTitle}>
              Manucure
            </Text>

            <Text style={styles.cardPrice}>
              20€
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  hero: {
    width: "100%",
    height: 420,
    position: "absolute",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.72)",
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  logo: {
    color: "#ff4fa3",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textShadowColor: "#ff1493",
    textShadowRadius: 18,
  },

  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    marginBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 50,
  },

  buttonPink: {
    backgroundColor: "#ff1493",
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#ff1493",
    shadowOpacity: 1,
    shadowRadius: 18,
  },

  buttonDark: {
    borderWidth: 2,
    borderColor: "#ff1493",
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 25,
    marginBottom: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ff1493",
  },

  cardImage: {
    width: "100%",
    height: 220,
  },

  cardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardPrice: {
    color: "#ff1493",
    fontSize: 28,
    fontWeight: "bold",
  },
});
