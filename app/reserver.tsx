import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";

export default function Reserver() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réserver</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://sumup.com")}
      >
        <Text style={styles.buttonText}>
          📅 Réserver via SumUp
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://wa.me/")}
      >
        <Text style={styles.buttonText}>
          💬 WhatsApp
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://instagram.com")}
      >
        <Text style={styles.buttonText}>
          📸 Instagram
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#111",
    justifyContent:"center",
    padding:25
  },
  title:{
    color:"#f4c7d5",
    fontSize:34,
    fontWeight:"700",
    textAlign:"center",
    marginBottom:40
  },
  button:{
    backgroundColor:"#1b1b1b",
    borderColor:"#f4c7d5",
    borderWidth:1,
    borderRadius:24,
    padding:22,
    marginBottom:18
  },
  buttonText:{
    color:"#fff",
    fontSize:20,
    fontWeight:"600",
    textAlign:"center"
  }
});

