import React, { Component } from 'react';
import { View, ActivityIndicator, InteractionManager } from 'react-native';

import API_URL from '~/src/api';
import PratoMax from '../../components/PratoMax';
import { Wrapper } from '../../styled-components/Wrapper';

class VerPrato extends Component {
  state = {
    prato: {},
    loading: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const response = await fetch(
        // `http://localhost:5000/pratos/detalhe/${this.props.navigation.state.params.id}`
        `${API_URL}/pratos/detalhe/${this.props.navigation.state.params.id}`
      );
      const data = await response.json();

      this.setState({
        prato: data,
        loading: false,
      });
    });
  }

  render() {
    const {
      Nome,
      Descricao,
      ModoPreparo,
      TempoPreparo,
      Foto,
      Dificuldade,
      ingredientes,
    } = this.state.prato;
    return (
      <Wrapper>
        {this.state.loading ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#1d3f72" />
          </View>
        ) : (
          <Wrapper>
            <PratoMax
              imagem={Foto}
              nome={Nome}
              descricao={Descricao}
              dificuldade={Dificuldade}
              modo={ModoPreparo}
              tempo={TempoPreparo}
              ingredientes={ingredientes}
            />
          </Wrapper>
        )}
      </Wrapper>
    );
  }
}

export default VerPrato;
