import React, { useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { API_URL } from 'react-native-dotenv';

import Prato from '~/src/components/Prato';
import { ScrollWrapper } from '~/src/styled-components/Wrapper';

import AdvancedSearch from './advancedSearch';
import PratosList from '../pratosList';
import styles from '../styles';

export default (props) => {
  const [pratos, setPratos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  function renderItem({ item }) {
    return (
      <Prato
        key={item.Id}
        id={item.Id}
        titulo={item.Nome}
        descricao={item.Descricao}
        imagem={item.Foto}
        dificuldade={item.Dificuldade}
        navegar={props.navigation.navigate}
      />
    );
  }

  async function buscaAvancada(nome, tempo, dificuldade, ing) {
    setMensagem('');
    setLoading(true);

    let ingredientes = null;
    nome ? '' : (nome = null);
    tempo ? (tempo *= 60) : (tempo = null);
    ing ? (ingredientes = ing.split(',')) : '';
    dificuldade === 'Qualquer' ? (dificuldade = null) : '';

    const response = await fetch(`${API_URL}/pratos/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        tempo,
        dificuldade,
        ingredientes,
      }),
    });

    const data = await response.json();
    if (data.length > 0) {
      setPratos(data);
      setLoading(true);
    } else {
      setPratos(data);
      setMensagem('Nenhum resultado encontrado');
      setLoading(true);
    }
  }

  return (
    <ScrollWrapper style={styles.paddingY10}>
      <AdvancedSearch busca={buscaAvancada} />
      {loading ? (
        <ActivityIndicator style={styles.marginTop150} size="large" color="#1d3f72" />
      ) : (
        <PratosList pratos={pratos} renderItem={renderItem} />
      )}
      <Text style={styles.center}>{mensagem}</Text>
    </ScrollWrapper>
  );
};
