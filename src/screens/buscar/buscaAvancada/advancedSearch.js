import React, { Component } from 'react';
import {
  View, Picker
} from 'react-native';

import { H4 } from '~/src/styled-components/Texto';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { FormGroup, Input, Select } from '~/src/styled-components/Input';

import styles from '../styles'

export default class buscar extends Component {
  state = {
    nome: '',
    tempo: '',
    dificuldade: 'Qualquer',
    ingredientes: ''
  }

  render() {
    const {
      nome, tempo, dificuldade, ingredientes
    } = this.state;

    return (
      <View>
        <FormGroup>
          <H4 style={styles.label}>Nome: <H4 style={styles.opcional}>(opcional)</H4></H4>
          <Input
            placeholder="Informe o nome do prato..."
            placeholderTextColor="grey"
            onChangeText={nome => this.setState({ nome })}
            value={nome}
            returnKeyType="next"
            onSubmitEditing={() => { this.tempo.focus(); }}
            blurOnSubmit={false}
          />
        </FormGroup>
        <FormGroup>
          <H4 style={styles.label}>Tempo de preparo: <H4 style={styles.opcional}>(opcional)</H4></H4>
          <Input
            placeholder="Informe o tempo de preparo em minutos..."
            keyboardType="numeric"
            placeholderTextColor="grey"
            onChangeText={tempo => this.setState({ tempo })}
            value={tempo}
            returnKeyType="next"
            onSubmitEditing={() => { this.ingredientes.focus(); }}
            ref={(ref) => { this.tempo = ref }}
            blurOnSubmit={false}
          />
        </FormGroup>
        <FormGroup>
          <H4 style={styles.label}>Dificuldade:</H4>
          <View style={{
            height: 45, alignSelf: 'stretch', borderBottomWidth: 2, borderColor: '#184890', borderRadius: 10
          }}
          >
            <Select
              mode="dropdown"
              style={{ color: '#0d2b56' }}
              onValueChange={dificuldade => this.setState({ dificuldade })}
              selectedValue={dificuldade}
            >
              <Picker.Item color="#184890" label="Qualquer" value="Qualquer" />
              <Picker.Item color="#184890" label="Muito fácil" value="Muito fácil" />
              <Picker.Item color="#184890" label="Fácil" value="Fácil" />
              <Picker.Item color="#184890" label="Médio" value="Médio" />
              <Picker.Item color="#184890" label="Difícil" value="Difícil" />
              <Picker.Item color="#184890" label="Muito difícil" value="Muito difícil" />
              <Picker.Item color="#184890" label="Masterchef" value="Masterchef" />
            </Select>
          </View>
        </FormGroup>
        <FormGroup>
          <H4 style={styles.label}>Ingredientes: <H4 style={styles.opcional}>(opcional)</H4></H4>
          <Input
            placeholder="ingredientes separados por virgula: sal, açucar, etc ..."
            placeholderTextColor="grey"
            onChangeText={ingredientes => this.setState({ ingredientes })}
            value={ingredientes}
            returnKeyType="done"
            // onSubmitEditing={() => { this.desc.focus(); }}
            ref={(ref) => { this.ingredientes = ref }}
            blurOnSubmit={false}
          />
        </FormGroup>
        <Botao onPress={() => this.props.busca(nome, parseInt(tempo, 10), dificuldade, ingredientes)} style={{ alignSelf: 'flex-end', width: 100 }}>
          <BotaoTexto>Buscar</BotaoTexto>
        </Botao>
      </View>
    )
  }
}
