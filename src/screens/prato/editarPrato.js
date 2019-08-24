import React, { Component } from 'react';
import {
  View,
  Picker,
  Image,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { API_URL } from 'react-native-dotenv';
import { connect } from 'react-redux';

import actions from '../../redux/actions/PratoActionCreator';
import { Botao, BotaoTexto } from '../../styled-components/Botao';
import {
  FormGroup, Input, InputNumber, TextArea, Select
} from '../../styled-components/Input';
import { H4, H5 } from '../../styled-components/Texto';
import { ScrollWrapper, Wrapper } from '../../styled-components/Wrapper';

const Ingrediente = (props) => {
  const { item } = props;
  return (
    <View style={styles.ingrediente}>
      <Text style={styles.ingredienteText}>
        {item.Nome} - {item.Quantidade} - {item.UnidadeMedida}
      </Text>
      <Text style={styles.remover} onPress={() => props.removerIngrediente(item.Id, item.Nome)}>
        Remover
      </Text>
    </View>
  );
};

class EditarPrato extends Component {
  state = {
    id: '',
    nome: '',
    desc: '',
    Ingrediente: '',
    Quantidade: '',
    UnidadeMedida: 'gramas (g)',
    ingredientes: [],
    modo: '',
    tempoh: '',
    tempom: '',
    tempos: '',
    dificuldade: 'Muito fácil',
    foto: null,
    fotoDisplay: null,
    fotoNome: 'camera',
    erro: '',
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const response = await fetch(
        `${API_URL}/pratos/detalhe/${this.props.navigation.state.params.id}`
      );
      const data = await response.json();

      const date = new Date(null);
      date.setSeconds(data.TempoPreparo);
      const tempo = date.toISOString().substr(11, 8);
      let tempoh = tempo.substring(0, 2);
      let tempom = tempo.substring(3, 5);
      let tempos = tempo.substring(6, 9);
      tempoh.substring(0, 1) === '0' ? (tempoh = tempoh.substring(1)) : '';
      tempom.substring(0, 1) === '0' ? (tempom = tempom.substring(1)) : '';
      tempos.substring(0, 1) === '0' ? (tempos = tempos.substring(1)) : '';

      this.setState({
        id: data.Id,
        nome: data.Nome,
        desc: data.Descricao,
        ingredientes: data.ingredientes,
        modo: data.ModoPreparo,
        tempoh,
        tempom,
        tempos,
        dificuldade: data.Dificuldade,
        fotoDisplay: data.Foto,
      });
    });
  }

  removerIngrediente = (id, nome) => {
    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir esse ingrediente?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const ingredientes = this.state.ingredientes.filter((i) => i.Nome !== nome);

            this.props.deleteIngredient(this.props.navigation.state.params.id, id);

            this.setState({
              ingredientes,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  adicionarIngrediente(Nome, Quantidade, UnidadeMedida) {
    if (Nome && Quantidade) {
      const ingrediente = {
        Nome,
        Quantidade,
        UnidadeMedida,
      };

      const igual = this.state.ingredientes.find((i) => i.Nome === ingrediente.Nome);

      if (!igual) {
        this.props.addIngredient(
          this.props.navigation.state.params.id,
          Nome,
          Quantidade,
          UnidadeMedida
        );
        this.setState({
          ingredientes: [...this.state.ingredientes, ingrediente],
        });
      }
    }
  }

  imagePicker() {
    const options = {
      title: 'Escolha uma opção',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        const source = `data:image/jpeg;base64,${response.data}`;
        const displaySource = response.uri;

        this.setState({
          foto: source,
          fotoDisplay: displaySource,
          fotoNome: response.fileName
            .split('.')
            .slice(0, -1)
            .join('.'),
        });
      }
    });
  }

  update(id, nome, desc, modo, tempoh, tempom, tempos, dif, foto, fotoNome) {
    this.setState({ erro: '' });

    tempoh || (tempoh = 0);
    tempom || (tempom = 0);
    tempos || (tempos = 0);
    const tempo = parseInt(tempoh * 3600, 10) + parseInt(tempom * 60, 10) + parseInt(tempos, 10);

    if (!nome) this.setState({ erro: 'Por favor, informe o nome do prato!' });
    else if (!desc) this.setState({ erro: 'Por favor, informe a descrição do prato!' });
    else if (!modo) this.setState({ erro: 'Por favor, informe o modo de preparo do prato!' });
    else if (!tempo) this.setState({ erro: 'Por favor, informe o tempo de preparo do prato!' });
    else if (!dif) this.setState({ erro: 'Por favor, informe o nível de dificuldade do prato!' });
    else {
      this.props.update(id, nome, desc, modo, tempo, dif, foto, fotoNome);
    }
  }

  render() {
    return (
      <Wrapper>
        {this.props.loading ? (
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
          <ScrollWrapper>
            <H5 style={{ color: 'red' }}>{this.props.erro}</H5>
            <H5 style={{ color: 'green' }}>{this.props.sucesso}</H5>
            <FormGroup>
              <H4 style={styles.label}>Nome:</H4>
              <Input
                placeholder="Informe o nome do prato..."
                placeholderTextColor="grey"
                onChangeText={(nome) => this.setState({ nome })}
                value={this.state.nome}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.desc.focus();
                }}
                blurOnSubmit={false}
              />
            </FormGroup>
            <FormGroup>
              <H4 style={styles.label}>Descrição:</H4>
              <TextArea
                placeholder="Informe a descrição do prato..."
                placeholderTextColor="grey"
                multiline
                onChangeText={(desc) => this.setState({ desc })}
                value={this.state.desc}
                returnKeyType="next"
                ref={(ref) => {
                  this.desc = ref;
                }}
                onSubmitEditing={() => {
                  this.ingredientes.focus();
                }}
                blurOnSubmit={false}
              />
            </FormGroup>

            <FormGroup>
              <H4 style={styles.label}>Ingredientes:</H4>
              <H5 style={{ color: 'green' }}>{this.props.sucessoIngredint}</H5>
              <FlatList
                style={{ width: '100%' }}
                data={this.state.ingredientes}
                renderItem={({ item, index }) => (
                  <Ingrediente
                    key={index}
                    item={item}
                    removerIngrediente={() => this.removerIngrediente(item.Id, item.Nome)}
                  />
                )}
              />
              <View style={styles.ingredientes}>
                <View>
                  <H5 style={styles.label}>Nome:</H5>
                  <Input
                    placeholder="Informe o nome do ingrediente"
                    placeholderTextColor="grey"
                    onChangeText={(Ingrediente) => this.setState({ Ingrediente })}
                    value={this.state.Ingrediente}
                    returnKeyType="next"
                    ref={(ref) => {
                      this.ingredientes = ref;
                    }}
                    onSubmitEditing={() => {
                      this.quantidade.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                <View>
                  <H5 style={styles.label}>Quantidade:</H5>
                  <InputNumber
                    keyboardType="numeric"
                    placeholder="Informe a quantidade do ingrediente"
                    placeholderTextColor="grey"
                    onChangeText={(Quantidade) => this.setState({ Quantidade })}
                    value={this.state.Quantidade}
                    ref={(ref) => {
                      this.quantidade = ref;
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                <View>
                  <H5 style={styles.label}>Unidade Medida:</H5>
                  <View
                    style={{
                      height: 45,
                      alignSelf: 'stretch',
                      borderBottomWidth: 2,
                      borderColor: '#184890',
                      borderRadius: 10,
                    }}
                  >
                    <Select
                      mode="dropdown"
                      onValueChange={(UnidadeMedida) => this.setState({ UnidadeMedida })}
                      selectedValue={this.state.UnidadeMedida}
                    >
                      <Picker.Item color="#184890" label="Gramas (g)" value="gramas (g)" />
                      <Picker.Item
                        color="#184890"
                        label="Quilogramas (kg)"
                        value="quilogramas (kg)"
                      />
                      <Picker.Item color="#184890" label="Colher" value="colher" />
                      <Picker.Item color="#184890" label="Colher de sopa" value="colher de sopa" />
                      <Picker.Item color="#184890" label="Colher de chá" value="colher de chá" />
                      <Picker.Item
                        color="#184890"
                        label="Colher de sobremesa"
                        value="colher de sobremesa"
                      />
                      <Picker.Item color="#184890" label="Colher de café" value="colher de café" />
                      <Picker.Item color="#184890" label="Xícara" value="xícara" />
                      <Picker.Item color="#184890" label="Xícara de chá" value="xícara de chá" />
                      <Picker.Item color="#184890" label="Concha" value="concha" />
                      <Picker.Item color="#184890" label="Copo" value="copo" />
                      <Picker.Item color="#184890" label="Fatia" value="fatia" />
                      <Picker.Item color="#184890" label="Unidade" value="unidade" />
                      <Picker.Item color="#184890" label="Porção" value="porção" />
                      <Picker.Item color="#184890" label="Dente" value="dente" />
                      <Picker.Item color="#184890" label="Maço" value="maço" />
                      <Picker.Item color="#184890" label="Tablete" value="tablete" />
                      <Picker.Item color="#184890" label="Prato" value="prato" />
                      <Picker.Item color="#184890" label="Bife" value="bife" />
                      <Picker.Item color="#184890" label="Filé" value="filé" />
                      <Picker.Item color="#184890" label="Item" value="item" />
                    </Select>
                  </View>
                </View>
                <Botao
                  style={{ alignSelf: 'flex-end', width: 100 }}
                  onPress={() => this.adicionarIngrediente(
                    this.state.Ingrediente,
                    this.state.Quantidade,
                    this.state.UnidadeMedida
                  )}
                >
                  <BotaoTexto style={{ paddingHorizontal: 10 }}>Adicionar</BotaoTexto>
                </Botao>
              </View>
            </FormGroup>

            <FormGroup>
              <H4 style={styles.label}>Modo de Preparo:</H4>
              <TextArea
                placeholder="Informe o modo de preparo do prato..."
                placeholderTextColor="grey"
                multiline
                onChangeText={(modo) => this.setState({ modo })}
                value={this.state.modo}
                returnKeyType="next"
                ref={(ref) => {
                  this.modo = ref;
                }}
                onSubmitEditing={() => {
                  this.tempoh.focus();
                }}
                blurOnSubmit={false}
              />
            </FormGroup>
            <FormGroup>
              <H4 style={styles.label}>Tempo de Preparo:</H4>
              <View
                style={{
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                }}
              >
                <InputNumber
                  style={{ marginBottom: 0, textAlign: 'center', width: '25%' }}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="grey"
                  onChangeText={(tempoh) => this.setState({ tempoh })}
                  value={this.state.tempoh}
                  returnKeyType="next"
                  ref={(ref) => {
                    this.tempoh = ref;
                  }}
                  onSubmitEditing={() => {
                    this.tempom.focus();
                  }}
                  blurOnSubmit={false}
                  maxLength={2}
                />
                <InputNumber
                  style={{ marginBottom: 0, textAlign: 'center', width: '25%' }}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="grey"
                  onChangeText={(tempom) => this.setState({ tempom })}
                  value={this.state.tempom}
                  returnKeyType="next"
                  ref={(ref) => {
                    this.tempom = ref;
                  }}
                  onSubmitEditing={() => {
                    this.tempos.focus();
                  }}
                  blurOnSubmit={false}
                  maxLength={2}
                />
                <InputNumber
                  style={{ marginBottom: 0, textAlign: 'center', width: '25%' }}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="grey"
                  onChangeText={(tempos) => this.setState({ tempos })}
                  value={this.state.tempos}
                  returnKeyType="next"
                  ref={(ref) => {
                    this.tempos = ref;
                  }}
                  blurOnSubmit={false}
                  maxLength={2}
                />
              </View>
              <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                <H5 style={{ flex: 1, color: '#0d2b56' }}>Horas</H5>
                <H5 style={{ flex: 2, color: '#0d2b56' }}>Minutos</H5>
                <H5 style={{ flex: 1, color: '#0d2b56' }}>Segundos</H5>
              </View>
            </FormGroup>
            <FormGroup>
              <H4 style={[styles.label, { marginTop: 15 }]}>Nível de dificuldade:</H4>
              <View
                style={{
                  height: 45,
                  alignSelf: 'stretch',
                  borderBottomWidth: 2,
                  borderColor: '#184890',
                  borderRadius: 10,
                }}
              >
                <Select
                  mode="dropdown"
                  style={{ color: '#0d2b56' }}
                  onValueChange={(dificuldade) => this.setState({ dificuldade })}
                  selectedValue={this.state.dificuldade}
                >
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
              <H4 style={[styles.label, { color: '#0d2b56', marginTop: 15 }]}>Foto:</H4>
              <Botao style={{ width: 180 }} onPress={() => this.imagePicker()}>
                <BotaoTexto>Escolher imagem...</BotaoTexto>
              </Botao>
              {this.state.fotoDisplay && (
                <FastImage
                  style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={{ uri: this.state.fotoDisplay }}
                />
              )}
            </FormGroup>
            <H5 style={{ color: 'red' }}>{this.state.erro}</H5>
            <Botao
              style={{
                marginBottom: 10,
                marginTop: 20,
                width: 150,
                alignSelf: 'center',
              }}
              onPress={() => this.update(
                this.state.id,
                this.state.nome,
                this.state.desc,
                this.state.modo,
                this.state.tempoh,
                this.state.tempom,
                this.state.tempos,
                this.state.dificuldade,
                this.state.foto,
                this.state.fotoNome
              )}
            >
              <BotaoTexto>Atualizar</BotaoTexto>
            </Botao>
          </ScrollWrapper>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  erro: state.PratoReducer.erro,
  sucesso: state.PratoReducer.sucesso,
  sucessoIngredint: state.PratoReducer.sucessoIngredient,
  loading: state.PratoReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  update(id, nome, desc, modo, tempo, dif, foto, fotoNome) {
    dispatch(actions.update(id, nome, desc, modo, tempo, dif, foto, fotoNome));
  },
  addIngredient(id, nome, quantidade, UnidadeMedida) {
    dispatch(actions.addIngredient(id, nome, quantidade, UnidadeMedida));
  },
  deleteIngredient(pratoId, id) {
    dispatch(actions.deleteIngredient(pratoId, id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarPrato);

const styles = StyleSheet.create({
  ingredientes: {
    width: '100%',
    marginTop: 10,
    marginLeft: 12,
    paddingRight: 10,
  },
  ingrediente: {
    width: '100%',
    borderBottomColor: 'rgba(24, 72, 144, 0.5)',
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  ingredienteText: {
    color: 'black',
    flex: 6,
  },
  remover: {
    color: 'red',
    flex: 2,
    textAlign: 'right',
  },
  label: {
    textAlign: 'left',
    color: '#0d2b56',
    width: '100%',
  },
});
