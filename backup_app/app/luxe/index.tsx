import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function LuxeHome() {
  return (
    <ScrollView style={styles.container}>

      <Image
        source={require("../../assets/images/maquette_nails_passion.png")}
        style={styles.hero}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Text style={styles.logo}>NP</Text>
        <Text style={styles.title}>Nail's Passion</Text>
        <Text style={styles.subtitle}>Luxury Nail Studio</Text>
      </View>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>💅</Text>
          <Text style={styles.cardText}>Prestations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>📸</Text>
          <Text style={styles.cardText}>Galerie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardText}>Agenda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>👩</Text>
          <Text style={styles.cardText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>💬</Text>
          <Text style={styles.cardText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.cardIcon}>📷</Text>
          <Text style={styles.cardText}>Instagram</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.formation}>
        <Text style={styles.formationText}>🎓 Formation payante</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#070707"
  },

  hero:{
    width:"100%",
    height:300
  },

  header:{
    alignItems:"center",
    marginTop:-35
  },

  logo:{
    color:"#E8CFCB",
    fontSize:32,
    fontWeight:"700",
    backgroundColor:"#111",
    padding:16,
    borderRadius:40
  },

  title:{
    color:"#F0D8D2",
    fontSize:32,
    fontWeight:"700",
    marginTop:15
  },

  subtitle:{
    color:"#CFAFA8",
    marginBottom:25
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-around",
    paddingHorizontal:12
  },

  smallCard:{
    width:"44%",
    backgroundColor:"#111",
    borderRadius:26,
    padding:22,
    marginBottom:16,
    alignItems:"center",
    borderWidth:1,
    borderColor:"#D6B2AB"
  },

  cardIcon:{
    fontSize:26,
    marginBottom:8
  },

  cardText:{
    color:"#fff",
    fontSize:16
  },

  formation:{
    backgroundColor:"#E8CFCB",
    marginHorizontal:22,
    borderRadius:30,
    padding:20,
    marginBottom:35,
    marginTop:8
  },

  formationText:{
    color:"#111",
    textAlign:"center",
    fontSize:18,
    fontWeight:"700"
  }
});
