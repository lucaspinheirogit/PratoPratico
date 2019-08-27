import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, InteractionManager } from 'react-native'
import { connect } from 'react-redux'

import Prato from '~/src/components/Prato'
import actions from '~/src/redux/actions/PratoActionCreator'
import { Botao, BotaoTexto } from '~/src/styled-components/Botao'
import { H5 } from '~/src/styled-components/Texto'
import { Wrapper, WrapperCenter } from '~/src/styled-components/Wrapper'
import AsyncStorage from '~/src/util/AsyncStorage'

class Feed extends Component {
  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        this.props.navigation.navigate('Home')
      } else {
        this.props.getPratos(this.props.offset, this.props.limit)
      }
    })
  }

  renderFooter = () => (
    <View style={{ alignItems: 'center' }}>
      {this.props.hasMore ? (
        <ActivityIndicator style={{ margin: 20 }} size="large" color="#1d3f72" />
      ) : (
        <H5 style={{ marginBottom: 80, color: '#CCC' }}>Não há mais pratos...</H5>
      )}
    </View>
  )

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
  )

  render() {
    return (
      <Wrapper>
        {this.props.loading ? (
          <WrapperCenter>
            <ActivityIndicator size="large" color="#1d3f72" />
          </WrapperCenter>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              {this.props.erro !== '' && <H5 style={{ color: 'red' }}>{this.props.erro}</H5>}
              <FlatList
                data={this.props.pratos}
                renderItem={this.renderItem}
                keyExtractor={item => item.Id.toString()}
                onEndReached={() => {
                  this.props.hasMore
                    ? this.props.getPratos(this.props.offset, this.props.limit)
                    : ''
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
    )
  }
}

const mapStateToProps = state => ({
  pratos: state.PratoReducer.pratos,
  offset: state.PratoReducer.offset,
  limit: state.PratoReducer.limit,
  hasMore: state.PratoReducer.hasMore,
  erro: state.PratoReducer.erro,
  loading: state.PratoReducer.loading,
})

const mapDispatchToProps = dispatch => ({
  getPratos(offset, limit) {
    dispatch(actions.getPratos(offset, limit))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
