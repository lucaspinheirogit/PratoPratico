import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator
} from 'react-native';
import { API_URL } from 'react-native-dotenv';

import Prato from '~/src/components/Prato';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { ScrollWrapper } from '~/src/styled-components/Wrapper';

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

  buscaSimples = async () => {
    this.setState({
      ...this.state,
      advancedSearch: false,
      mensagem: '',
      loading: true,
    });

    const response = await fetch(`${API_URL}/pratos/random`);
    const data = await response.json();

    this.setState({
      ...this.state,
      pratos: data,
      loading: false,
    });
  };

  render() {
    return (
      <ScrollWrapper style={{ paddingVertical: 10 }}>
        <View style={styles.containerBotoes}>
          <Botao onPress={this.buscaSimples}>
            <BotaoTexto>Buscar</BotaoTexto>
          </Botao>
        </View>
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
