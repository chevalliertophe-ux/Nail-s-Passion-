import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
        }}
        style={styles.hero}
      />

      <Text style={styles.title}>Nail's Passion</Text>

      <Text style={styles.subtitle}>
        Beauté • Élégance • Onglerie Premium
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Réserver maintenant</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Nos Prestations</Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200",
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Pose Gel</Text>
          <Text style={styles.cardPrice}>25€</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200",
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Nail Art</Text>
          <Text style={styles.cardPrice}>15€</Text>
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
          <Text style={styles.cardTitle}>Remplissage</Text>
          <Text style={styles.cardPrice}>20€</Text>
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
    height: 340,
  },

  title: {
    color: "#ff1493",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#ff1493",
    marginHorizontal: 25,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#ff1493",
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  section: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    margin: 25,
  },

  card: {
    backgroundColor: "#111",
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ff1493",
  },

  cardImage: {
    width: "100%",
    height: 220,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardPrice: {
    color: "#ff1493",
    fontSize: 22,
    fontWeight: "bold",
  },
});
