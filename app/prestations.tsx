import { ScrollView, Text, StyleSheet, View } from "react-native";

export default function Prestations() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prestations</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💅 Pose complète</Text>
        <Text style={styles.cardSub}>Prix à renseigner</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>✨ Nail Art</Text>
        <Text style={styles.cardSub}>Prix à renseigner</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌸 Beauté des mains</Text>
        <Text style={styles.cardSub}>Prix à renseigner</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👣 Beauté des pieds</Text>
        <Text style={styles.cardSub}>Prix à renseigner</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#111",
    padding:22
  },
  title:{
    color:"#f4c7d5",
    fontSize:38,
    fontWeight:"700",
    textAlign:"center",
    marginTop:60,
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
