import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";

export default function Client() {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Nail's Passion</Text>

          <Text style={styles.subtitle}>
            Entrez dans un univers de luxe et de beauté
          </Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/prestations")}
          >
            <Text style={styles.cardTitle}>💅 Prestations</Text>
            <Text style={styles.cardSub}>
              Découvrez nos soins et créations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/galerie")}
          >
            <Text style={styles.cardTitle}>📸 Galerie</Text>
            <Text style={styles.cardSub}>
              Inspirations & réalisations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/reserver")}
          >
            <Text style={styles.cardTitle}>📅 Réserver</Text>
            <Text style={styles.cardSub}>
              Prenez rendez-vous facilement
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/contact")}
          >
            <Text style={styles.cardTitle}>💬 Contact</Text>
            <Text style={styles.cardSub}>
              WhatsApp • Instagram • Infos
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  title: {
    color: "#f4c7d5",
    fontSize: 44,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    color: "#f7f2f4",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 38,
  },

  card: {
    backgroundColor: "rgba(15,15,15,0.78)",
    borderRadius: 32,
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(244,199,213,0.55)",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardSub: {
    color: "#d9c5cd",
    fontSize: 16,
  },
});

