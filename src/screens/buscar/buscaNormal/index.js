import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import API_URL from '~/src/api';
import Prato from '~/src/components/Prato';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { ScrollWrapper } from '~/src/styled-components/Wrapper';

import PratosList from '../pratosList';
import styles from '../styles';

const BuscaNormal = (props) => {
  const [pratos, setPratos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  async function buscaSimples() {
    setMensagem('');
    setLoading(true);

    const response = await fetch(`${API_URL}/pratos/random`);
    const data = await response.json();

    setPratos(data);
    setLoading(false);
  }

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

  return (
    <ScrollWrapper style={styles.paddingY10}>
      <View style={styles.containerBotoes}>
        <Botao onPress={buscaSimples}>
          <BotaoTexto>Buscar</BotaoTexto>
        </Botao>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.marginTop150} size="large" color="#1d3f72" />
      ) : (
        <PratosList pratos={pratos} renderItem={renderItem} />
      )}
      <Text style={styles.center}>{mensagem}</Text>
    </ScrollWrapper>
  );
};

export default BuscaNormal;
