import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { id: '1', title: 'Massas', icon: 'pizza-slice' },
  { id: '2', title: 'Saladas', icon: 'leaf' },
  { id: '3', title: 'Carnes', icon: 'drumstick-bite' },
  { id: '4', title: 'Sobremesas', icon: 'ice-cream' },
];

export default function CategoriesScreen({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('Receitas', { selectedCategory: category });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCategoryPress(item.title)}
          >
            <FontAwesome5 name={item.icon} size={36} color="#fff" />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  grid: {
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ff9800',
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
