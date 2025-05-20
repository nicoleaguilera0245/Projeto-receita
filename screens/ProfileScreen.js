import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@user_name');
        if (storedName) {
          setSavedName(storedName);
          setName(storedName);
        }
      } catch (e) {
        console.log('Erro ao carregar nome:', e);
      }
    };
    loadName();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('@user_name', name);
      setSavedName(name);
    } catch (e) {
      console.log('Erro ao salvar nome:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>👤 Nome do Usuário</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        style={styles.input}
      />
      <Button title="Salvar" onPress={handleSave} />
      {savedName ? (
        <Text style={styles.saved}>Nome salvo: {savedName}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saved: { marginTop: 20, fontSize: 16, fontStyle: 'italic', color: 'green' },
});
