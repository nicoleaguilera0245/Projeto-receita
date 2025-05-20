import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipesListScreen({ navigation, route }) {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    route?.params?.selectedCategory || 'Todas'
  );
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const categories = ['Todas', 'Massas', 'Saladas', 'Carnes', 'Sobremesas'];

  // Carrega favoritos
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('@favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.log('Erro ao carregar favoritos:', e);
      }
    };
    loadFavorites();
  }, []);

  // Atualiza categoria quando volta da tela de categorias
  useEffect(() => {
    if (route?.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route?.params?.selectedCategory]);

  // Filtra receitas
  useEffect(() => {
    let filtered = recipes;

    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (search !== '') {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  }, [search, selectedCategory]);

  const toggleFavorite = async (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updated);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar receita..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() =>
              navigation.navigate('Detalhes', {
                title: item.title,
                description: item.description,
                image: item.image,
              })
            }
            onToggleFavorite={() => toggleFavorite(item.id)}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 16,
    borderRadius: 6,
    fontSize: 16,
    elevation: 2,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  categoryButtonSelected: {
    backgroundColor: '#ff9800',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
