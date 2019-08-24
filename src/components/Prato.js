import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { Botao, BotaoTexto } from '../styled-components/Botao';
import { PratoImg } from '../styled-components/Imagem';
import { TituloPrato, DescricaoPrato, H4 } from '../styled-components/Texto';
import actions from '../redux/actions/UsuarioActionCreator';

class Prato extends Component {
  state = {
    favorito: false,
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.props.favoritos.includes(this.props.id)) {
        this.setState({ favorito: true });
      }
    }, 500);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.favoritos.includes(this.props.id)) {
        this.setState({ favorito: true });
      }
    }, 500);
  }

  favoritar = () => {
    this.setState({ favorito: !this.state.favorito });
    this.props.favorite(this.props.id, this.state.favorito);
  };

  render() {
    const {
      id, imagem, titulo, dificuldade
    } = this.props;
    let { descricao } = this.props;
    descricao = descricao.substring(0, 240);

    return (
      <View style={{ alignItems: 'center' }}>
        <FastImage
          style={{
            width: '100%', height: 280, borderColor: '#0d2b56', borderTopWidth: 2
          }}
          source={{ uri: imagem }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['rgba(13, 43, 86, 0.85)', 'rgba(13, 43, 86, 0.3)']}
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
            }}
          >
            <H4
              style={{
                textAlign: 'left',
                width: 150,
                color: '#FFF',
                textShadowColor: '#0d2b56',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 1,
              }}
            >
              {dificuldade}
            </H4>

            <TouchableWithoutFeedback onPress={this.favoritar} style={{ padding: 5 }}>
              <Icon
                style={{
                  textShadowColor: '#0d2b56',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
                name="star"
                size={28}
                color={this.state.favorito ? '#f0f026' : 'rgba(240, 240, 38,0.4)'}
              />
            </TouchableWithoutFeedback>
          </LinearGradient>
        </FastImage>
        <TituloPrato>{titulo}</TituloPrato>
        <DescricaoPrato>{descricao}</DescricaoPrato>
        <Botao style={{ marginBottom: 10 }} onPress={() => this.props.navegar('VerPrato', { id })}>
          <BotaoTexto style={{ paddingHorizontal: 15 }}>Ver mais</BotaoTexto>
        </Botao>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  favoritos: state.UsuarioReducer.favoritos,
});

const mapDispatchToProps = (dispatch) => ({
  favorite(id, isFav) {
    dispatch(actions.favorite(id, isFav));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prato);
