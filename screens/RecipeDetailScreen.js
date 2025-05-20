import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function RecipeDetailScreen({ route }) {
  const { title, description, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  description: { fontSize: 18 },
});
