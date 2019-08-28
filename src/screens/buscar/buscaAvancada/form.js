import { Formik } from 'formik'
import React from 'react'
import { View, ActivityIndicator, Picker } from 'react-native'
import * as Yup from 'yup'

import { Botao, BotaoTexto } from '~/src/styled-components/Botao'
import { Input, FormGroup, Select } from '~/src/styled-components/Input'
import { H4, H5 } from '~/src/styled-components/Texto'

import styles from '../styles'

const LoginForm = props => (
  <Formik
    initialValues={{ nome: '', tempo: '', dificuldade: 'Qualquer', ingredientes: '' }}
    onSubmit={props.onSubmit}
    validationSchema={validationSchema}
  >
    {props => (
      <View style={styles.container}>
        {props.isSubmitting ? (
          <ActivityIndicator size="large" color="#1d3f72" />
        ) : (
          <View>
            <FormGroup>
              <H4 style={styles.label}>
                Nome: <H4 style={styles.opcional}>(opcional)</H4>
              </H4>
              <Input
                onChangeText={props.handleChange('nome')}
                value={props.values.nome}
                blurOnSubmit={false}
              />
            </FormGroup>
            <FormGroup>
              <H4 style={styles.label}>
                Tempo de preparo: <H4 style={styles.opcional}>(opcional)</H4>
              </H4>
              <Input
                onChangeText={props.handleChange('tempo')}
                value={props.values.tempo}
                placeholder="Informe o tempo de preparo em minutos..."
                placeholderTextColor="grey"
                keyboardType="numeric"
                blurOnSubmit={false}
              />
              <H5 style={styles.inputErro}>{props.errors.tempo}</H5>
            </FormGroup>
            <FormGroup>
              <H4 style={styles.label}>Dificuldade:</H4>
              <View style={styles.selectContainer}>
                <Select
                  mode="dropdown"
                  style={styles.selectColor}
                  onValueChange={props.handleChange('dificuldade')}
                  selectedValue={props.values.dificuldade}
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
              <H4 style={styles.label}>
                Ingredientes: <H4 style={styles.opcional}>(opcional)</H4>
              </H4>
              <Input
                onChangeText={props.handleChange('ingredientes')}
                value={props.values.ingredientes}
                placeholder="ingredientes separados por virgula: sal, açucar, etc ..."
                placeholderTextColor="grey"
                blurOnSubmit={false}
              />
            </FormGroup>
            <Botao onPress={props.handleSubmit} style={styles.btnBuscar}>
              <BotaoTexto>Buscar</BotaoTexto>
            </Botao>
          </View>
        )}
      </View>
    )}
  </Formik>
)

const validationSchema = Yup.object().shape({
  tempo: Yup.number().typeError('Informe um número válido'),
})

export default LoginForm
