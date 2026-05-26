import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nail's Passion</Text>
        <Text style={styles.subtitle}>Luxury Nail Studio</Text>
      </View>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1604654894610-df63bc536371" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>Prestations</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>Galerie</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1506784365847-bbad939e9335" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>Agenda</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>Clientes</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>WhatsApp</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1" }}
            style={styles.image}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.cardText}>Formation</Text>
          </ImageBackground>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    color: "#f7d7e3",
    fontSize: 34,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#b89ca8",
    fontSize: 18,
    marginTop: 6,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },

  card: {
    width: "45%",
    height: 210,
    backgroundColor: "#111",
    borderRadius: 30,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d8b4c4",
  },

  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 25,
  },

  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
