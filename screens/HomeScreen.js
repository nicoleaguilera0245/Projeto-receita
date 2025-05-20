import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@user_name');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (e) {
        console.log('Erro ao carregar nome:', e);
      }
    };
    loadName();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://source.unsplash.com/900x700/?food,table' }}
        style={styles.background}
        resizeMode="cover"
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <Text style={styles.greeting}>
            {userName ? `Olá, ${userName}!` : 'Bem-vindo(a)!'}
          </Text>
          <Text style={styles.subtitle}>Vamos cozinhar algo delicioso hoje?</Text>
        </View>
      </ImageBackground>

      <View style={styles.menuContainer}>
        <MenuItem icon="utensils" label="Receitas" onPress={() => navigation.navigate('Receitas')} />
        <MenuItem icon="th-list" label="Categorias" onPress={() => navigation.navigate('Categorias')} />
        <MenuItem icon="star" label="Favoritos" onPress={() => navigation.navigate('Favoritos')} />
        <MenuItem icon="user" label="Perfil" onPress={() => navigation.navigate('Perfil')} />
      </View>
    </View>
  );
}

function MenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <FontAwesome5 name={icon} size={22} color="#fff" />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    height: height - 100, // altura da tela menos espaço da barra de menu
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
