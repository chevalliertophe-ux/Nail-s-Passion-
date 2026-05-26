import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.sub}>Nail's Passion PRO</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/agenda")}>
        <Text style={styles.txt}>Agenda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/clientes")}>
        <Text style={styles.txt}>Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/prestations")}>
        <Text style={styles.txt}>Prestations</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/galerie")}>
        <Text style={styles.txt}>Galerie</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/whatsapp")}>
        <Text style={styles.txt}>WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/instagram")}>
        <Text style={styles.txt}>Instagram</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#000",
    alignItems:"center",
    justifyContent:"center"
  },
  title:{
    fontSize:34,
    color:"#f5d0dc",
    fontWeight:"bold",
    marginBottom:8
  },
  sub:{
    color:"#aaa",
    marginBottom:30
  },
  btn:{
    width:"80%",
    backgroundColor:"#f5d0dc",
    padding:16,
    borderRadius:18,
    marginVertical:8,
    alignItems:"center"
  },
  txt:{
    fontSize:18,
    fontWeight:"bold",
    color:"#000"
  }
});
