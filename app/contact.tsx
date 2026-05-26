import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL("https://wa.me/")}
      >
        <Text style={styles.cardTitle}>💬 WhatsApp</Text>
        <Text style={styles.cardSub}>Nous contacter rapidement</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL("https://instagram.com")}
      >
        <Text style={styles.cardTitle}>📸 Instagram</Text>
        <Text style={styles.cardSub}>Suivez Nail's Passion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>📍 Institut</Text>
        <Text style={styles.cardSub}>
          Adresse à renseigner
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#111",
    padding:24,
    paddingTop:70
  },
  title:{
    color:"#f4c7d5",
    fontSize:38,
    fontWeight:"700",
    textAlign:"center",
    marginBottom:35
  },
  card:{
    backgroundColor:"rgba(20,20,20,0.88)",
    borderRadius:28,
    padding:24,
    borderWidth:1,
    borderColor:"#f4c7d5",
    marginBottom:18
  },
  cardTitle:{
    color:"#fff",
    fontSize:22,
    fontWeight:"700",
    marginBottom:8
  },
  cardSub:{
    color:"#d9c5cd",
    fontSize:15
  }
});
