import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/data';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('@favorites');
        if (stored) {
          const favoriteIds = JSON.parse(stored);
          const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id));
          setFavorites(favoriteRecipes);
        }
      } catch (e) {
        console.log('Erro ao carregar favoritos:', e);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Você ainda não favoritou nenhuma receita.</Text>
      ) : (
        <FlatList
          data={favorites}
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
              isFavorite={true}
              onToggleFavorite={() => {}} // Não permite desfavoritar daqui
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
});
