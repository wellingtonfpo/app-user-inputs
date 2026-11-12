// App.js - Formas de input do usuário em React Native (Expo + JavaScript)
// Disciplina: Webmobile - ADS
//
// Inputs demonstrados:
// 1. TextInput (texto, e-mail, senha, numérico, multilinha)
// 2. Switch (liga/desliga)
// 3. Checkbox (múltipla escolha) - feito com Pressable
// 4. Radio button (escolha única) - feito com Pressable
// 5. Picker (lista suspensa)
// 6. Slider (valor em intervalo)
// 7. Stepper (+ / -)
// 8. DateTimePicker (data)
// 9. Botões (Button e TouchableOpacity)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

// Opções usadas nos checkboxes e radios
const INTERESSES = ['Programação', 'Design', 'Redes', 'Banco de Dados'];
const TURNOS = ['Manhã', 'Tarde', 'Noite'];

export default function App() {
  // ---------- Estados (useState) ----------
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [bio, setBio] = useState('');
  const [notificacoes, setNotificacoes] = useState(false);
  const [interesses, setInteresses] = useState([]); // array de strings
  const [turno, setTurno] = useState('');
  const [curso, setCurso] = useState('ads');
  const [nivel, setNivel] = useState(5);
  const [quantidade, setQuantidade] = useState(0);
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [preenchido, setPreenchido] = useState(0); // % de campos preenchidos

  // ---------- Efeitos (useEffect) ----------

  // Roda sempre que algum campo muda: recalcula o progresso do formulário
  useEffect(() => {
    const campos = [
      nome !== '',
      email !== '',
      senha !== '',
      idade !== '',
      bio !== '',
      interesses.length > 0,
      turno !== '',
    ];
    const total = campos.filter(Boolean).length;
    setPreenchido(Math.round((total / campos.length) * 100));
  }, [nome, email, senha, idade, bio, interesses, turno]);

  // ---------- Funções auxiliares ----------

  // Marca ou desmarca um interesse (checkbox)
  const alternarInteresse = (item) => {
    if (interesses.includes(item)) {
      setInteresses(interesses.filter((i) => i !== item));
    } else {
      setInteresses([...interesses, item]);
    }
  };

  // Evento do seletor de data
  const aoMudarData = (evento, dataEscolhida) => {
    setMostrarData(Platform.OS === 'ios'); // no Android fecha sozinho
    if (dataEscolhida) setData(dataEscolhida);
  };

  const enviar = () => {
    Alert.alert(
      'Dados enviados',
      `Nome: ${nome}\nE-mail: ${email}\nIdade: ${idade}\nTurno: ${turno}\n` +
        `Interesses: ${interesses.join(', ') || '-'}\nCurso: ${curso}\n` +
        `Nível: ${nivel}\nQuantidade: ${quantidade}\n` +
        `Notificações: ${notificacoes ? 'Sim' : 'Não'}\n` +
        `Data: ${data.toLocaleDateString('pt-BR')}`,
    );
  };

  const limpar = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setIdade('');
    setBio('');
    setNotificacoes(false);
    setInteresses([]);
    setTurno('');
    setCurso('ads');
    setNivel(5);
    setQuantidade(0);
    setData(new Date());
  };

  // ---------- Interface ----------
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Formas de Input</Text>
        <Text style={styles.progresso}>Preenchido: {preenchido}%</Text>

        {/* 1. TextInput */}
        <Text style={styles.secao}>1. TextInput</Text>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder='Idade (numérico)'
          keyboardType='numeric'
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput
          style={[styles.input, styles.multilinha]}
          placeholder='Sobre você (várias linhas)'
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        />
        <Text style={styles.dica}>{bio.length} caracteres</Text>

        {/* 2. Switch */}
        <Text style={styles.secao}>2. Switch</Text>
        <View style={styles.linha}>
          <Text>Receber notificações</Text>
          <Switch value={notificacoes} onValueChange={setNotificacoes} />
        </View>

        {/* 3. Checkbox */}
        <Text style={styles.secao}>3. Checkbox (vários)</Text>
        {INTERESSES.map((item) => (
          <Pressable
            key={item}
            style={styles.opcao}
            onPress={() => alternarInteresse(item)}
          >
            <View
              style={[
                styles.caixa,
                interesses.includes(item) && styles.marcado,
              ]}
            >
              {interesses.includes(item) && <Text style={styles.check}>✓</Text>}
            </View>
            <Text>{item}</Text>
          </Pressable>
        ))}

        {/* 4. Radio */}
        <Text style={styles.secao}>4. Radio (um só)</Text>
        {TURNOS.map((item) => (
          <Pressable
            key={item}
            style={styles.opcao}
            onPress={() => setTurno(item)}
          >
            <View style={styles.radio}>
              {turno === item && <View style={styles.radioInterno} />}
            </View>
            <Text>{item}</Text>
          </Pressable>
        ))}

        {/* 5. Picker */}
        <Text style={styles.secao}>5. Picker (lista suspensa)</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={curso}
            onValueChange={(valor) => setCurso(valor)}
          >
            <Picker.Item label='Análise e Desenv. de Sistemas' value='ads' />
            <Picker.Item label='Redes de Computadores' value='redes' />
            <Picker.Item label='Ciência de Dados' value='dados' />
          </Picker>
        </View>

        {/* 6. Slider */}
        <Text style={styles.secao}>6. Slider</Text>
        <Text>Nível de conhecimento: {nivel}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={nivel}
          onValueChange={setNivel}
        />

        {/* 7. Stepper */}
        <Text style={styles.secao}>7. Stepper (+ / -)</Text>
        <View style={styles.linha}>
          <Button
            title='-'
            onPress={() => setQuantidade(Math.max(0, quantidade - 1))}
          />
          <Text style={styles.contador}>{quantidade}</Text>
          <Button title='+' onPress={() => setQuantidade(quantidade + 1)} />
        </View>

        {/* 8. Data */}
        <Text style={styles.secao}>8. Seletor de data</Text>
        <Button
          title={`Data: ${data.toLocaleDateString('pt-BR')}`}
          onPress={() => setMostrarData(true)}
        />
        {mostrarData && (
          <DateTimePicker
            value={data}
            mode='date'
            display='default'
            onValueChange={aoMudarData}
          />
        )}

        {/* 9. Botões */}
        <Text style={styles.secao}>9. Botões</Text>
        <TouchableOpacity style={styles.botao} onPress={enviar}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, styles.botaoCinza]}
          onPress={limpar}
        >
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Estilos ----------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f6fa' },
  container: { padding: 20, paddingBottom: 60 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  progresso: { textAlign: 'center', color: '#555', marginBottom: 10 },
  secao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: '#2d3436',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  multilinha: { height: 90, textAlignVertical: 'top' },
  dica: { color: '#888', fontSize: 12 },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opcao: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  caixa: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#0984e3',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marcado: { backgroundColor: '#0984e3' },
  check: { color: '#fff', fontWeight: 'bold' },
  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#0984e3',
    borderRadius: 11,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0984e3',
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  contador: { fontSize: 22, fontWeight: 'bold' },
  botao: {
    backgroundColor: '#0984e3',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  botaoCinza: { backgroundColor: '#636e72' },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
