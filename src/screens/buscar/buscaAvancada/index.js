import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator
} from 'react-native';
import { API_URL } from 'react-native-dotenv';

import Prato from '~/src/components/Prato';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { ScrollWrapper } from '~/src/styled-components/Wrapper';

import AdvancedSearch from './advancedSearch';
import PratosList from '../pratosList';
import styles from '../styles'

export default class Buscar extends Component {
  state = {
    pratos: [],
    mensagem: '',
    loading: false,
  };

  renderItem = ({ item }) => (
    <Prato
      key={item.Id}
      id={item.Id}
      titulo={item.Nome}
      descricao={item.Descricao}
      imagem={item.Foto}
      dificuldade={item.Dificuldade}
      navegar={this.props.navigation.navigate}
    />
  );

  buscaAvancada = async (nome, tempo, dificuldade, ing) => {
    this.setState({
      ...this.state,
      mensagem: '',
      loading: true,
    });

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
      this.setState({
        ...this.state,
        pratos: data,
        loading: false,
      });
    } else {
      this.setState({
        ...this.state,
        pratos: [],
        mensagem: 'Nenhum resultado encontrado',
        loading: false,
      });
    }
  };

  render() {
    return (
      <ScrollWrapper style={{ paddingVertical: 10 }}>
        <AdvancedSearch busca={this.buscaAvancada} />
        {this.state.loading ? (
          <ActivityIndicator style={{ marginTop: 150 }} size="large" color="#1d3f72" />
        ) : (
          <PratosList pratos={this.state.pratos} renderItem={this.renderItem} />
        )}
        <Text style={{ textAlign: 'center' }}>{this.state.mensagem}</Text>
      </ScrollWrapper>
    );
  }
}
