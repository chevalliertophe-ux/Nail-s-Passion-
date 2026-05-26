import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function Agenda() {
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Agenda</Text>

      <TextInput
        placeholder="Nom cliente"
        placeholderTextColor="#999"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Date / Heure"
        placeholderTextColor="#999"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ajouter RDV</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#000",
    justifyContent:"center",
    padding:25
  },
  title:{
    color:"#D4AF37",
    fontSize:34,
    fontWeight:"bold",
    marginBottom:30,
    textAlign:"center"
  },
  input:{
    backgroundColor:"#111",
    color:"#fff",
    borderWidth:1,
    borderColor:"#D4AF37",
    borderRadius:15,
    padding:15,
    marginBottom:15
  },
  button:{
    backgroundColor:"#D4AF37",
    padding:18,
    borderRadius:20,
    alignItems:"center"
  },
  buttonText:{
    color:"#000",
    fontSize:18,
    fontWeight:"bold"
  }
});

