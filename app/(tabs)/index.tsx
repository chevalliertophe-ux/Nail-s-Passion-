import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nail's Passion</Text>
      <Text style={styles.subtitle}>
        Beauté • Élégance • Premium
      </Text>
      <Text style={styles.text}>
        La beauté est ma passion ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#ff4fa3',
    fontSize: 20,
    marginTop: 10,
  },

  text: {
    color: '#fff',
    fontSize: 28,
    marginTop: 40,
    textAlign: 'center',
  },
});
