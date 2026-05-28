import { View, Text, StyleSheet } from 'react-native';

export default function AgendaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda Nail’s Passion</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Réservations</Text>
        <Text style={styles.cardText}>
          Les rendez-vous apparaîtront ici.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Planning</Text>
        <Text style={styles.cardText}>
          Gestion agenda en préparation.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#111',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    color: '#666',
  },
});

