import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [resultado, setResultado] = useState()
  const [userName, setUsername] = useState()

  async function saveItem() {
    try {
      await AsyncStorage.setItem('@app:user', userName)
      setResultado(`Seja bem vindo, ${userName}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await AsyncStorage.getItem('@app:user')
        if (user) {
          setResultado(`Seja bem vindo, ${user}`)
        } else {
          setResultado("Nenhuma informação encontrada")
        }
      } catch (err) {
        console.log(err)
      }
    } fetchData()
  }, [])

  async function clear() {
    await AsyncStorage.clear()
    setResultado("Nenhuma informação encontrada")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Login
        </Text>
        <View style={styles.flex}>
          <TextInput
            placeholder="Digite seu username"
            value={userName}
            onChangeText={(texto) => setUsername(texto)}
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            onPress={saveItem}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
        <Text>
          {resultado}
        </Text>
        <TouchableOpacity
          style={styles.buttonLimpar}
          onPress={clear}>
          <Text
            style={styles.buttonTextStyle}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center'
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 10
  },
  buttonLimpar: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flex2: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default App;
