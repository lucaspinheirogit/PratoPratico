import React, { PureComponent } from 'react';
import {
  View, FlatList, ActivityIndicator, InteractionManager
} from 'react-native';
import { API_URL } from 'react-native-dotenv';

import Prato from '~/src/components/Prato';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { H5 } from '~/src/styled-components/Texto';
import { Wrapper, WrapperCenter } from '~/src/styled-components/Wrapper';
import AsyncStorage from '~/src/util/AsyncStorage';

export default class Feed extends PureComponent {
  state = {
    favoritos: [],
    limit: 2,
    offset: 0,
    hasMore: true,
    loading: true,
    isFetching: false,
    erro: '',
  };

  async componentDidMount() {
    const { offset, limit } = this.state;
    InteractionManager.runAfterInteractions(() => {
      this.getFavoritos(offset, limit);
    });
  }

  getFavoritos = async (offset, limit) => {
    const response = await fetch(`${API_URL}/favoritos?offset=${offset}&limit=${limit}`, {
      headers: {
        Authorization: await AsyncStorage.getItem('token'),
      },
    });
    const data = await response.json();

    this.setState({
      favoritos: [...this.state.favoritos, ...data.pratos],
      offset: this.state.offset + this.state.limit,
      hasMore: data.pagination.hasMore,
      loading: false,
    });
  };

  onRefresh = async () => {
    this.setState({ isFetching: true });
    const response = await fetch(`${API_URL}/favoritos?limit=${this.state.limit}`, {
      headers: {
        Authorization: await AsyncStorage.getItem('token'),
      },
    });
    const data = await response.json();

    this.setState({
      favoritos: data.pratos,
      offset: this.state.limit,
      hasMore: data.pagination.hasMore,
      loading: false,
      isFetching: false,
    });
  };

  renderFooter = () => (
    <View style={{ alignItems: 'center' }}>
      {this.state.hasMore ? (
        <ActivityIndicator style={{ margin: 20 }} size="large" color="#1d3f72" />
      ) : (
        <H5 style={{ marginBottom: 80, color: '#CCC' }}>Não há mais favoritos...</H5>
      )}
    </View>
  );

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

  render() {
    return (
      <Wrapper>
        {this.state.loading ? (
          <WrapperCenter>
            <ActivityIndicator size="large" color="#1d3f72" />
          </WrapperCenter>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              {this.state.erro !== '' && <H5 style={{ color: 'red' }}>{this.state.erro}</H5>}
              <FlatList
                data={this.state.favoritos}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                renderItem={this.renderItem}
                keyExtractor={item => item.Id.toString()}
                onEndReached={() => {
                  this.state.hasMore ? this.getFavoritos(this.state.offset, this.state.limit) : '';
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this.renderFooter}
              />
            </View>
            <Botao
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                width: 45,
              }}
              onPress={() => this.props.navigation.navigate('AddPrato')}
            >
              <BotaoTexto style={{ fontSize: 22 }}>+</BotaoTexto>
            </Botao>
          </View>
        )}
      </Wrapper>
    );
  }
}
