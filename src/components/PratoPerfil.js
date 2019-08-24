import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

import { Botao, BotaoTexto } from '../styled-components/Botao';
import { H5, H6 } from '../styled-components/Texto';

const PratoPerfil = (props) => {
  const { id, nome, data } = props;
  return (
    <View style={{
      padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#305c9b'
    }}
    >
      <View style={{ flex: 1 }}>
        <H5 style={{ color: '#FFF', textAlign: 'left' }}>{nome}</H5>
        <H6 style={{ color: '#ccc', textAlign: 'left' }}>
          Criado em:
          {moment(data).format('DD/MM/YYYY')}
        </H6>
      </View>
      <Botao
        style={{
          backgroundColor: '#305c9b', borderWidth: 1, borderColor: '#184890', minWidth: 65
        }}
        onPress={() => props.navegar('VerPrato', { id })}
      >
        <BotaoTexto style={{ paddingHorizontal: 20 }}>Ver</BotaoTexto>
      </Botao>
      <Botao
        style={{ backgroundColor: '#027524', borderWidth: 1, borderColor: '#005e1c' }}
        onPress={() => props.navegar('EditarPrato', { id })}
      >
        <BotaoTexto style={{ paddingHorizontal: 10 }}>Editar</BotaoTexto>
      </Botao>
      <Botao
        style={{
          backgroundColor: '#8e0000', borderWidth: 1, borderColor: '#630000', minWidth: 80
        }}
        onPress={() => props.excluir(id)}
      >
        <BotaoTexto style={{ paddingHorizontal: 10 }}>Excluir</BotaoTexto>
      </Botao>
    </View>
  );
};

export default PratoPerfil;
