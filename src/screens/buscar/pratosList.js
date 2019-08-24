import React from 'react'
import { View, FlatList } from 'react-native';
import { TituloPrato } from '../../styled-components/Texto'

export default (props) => {
  if (props.pratos.length > 0) {
    return (
      <View style={{ marginVertical: 10 }}>
        <TituloPrato>Resultado da busca: </TituloPrato>
        <FlatList
          data={props.pratos}
          renderItem={props.renderItem}
          keyExtractor={item => item.Id.toString()}
        />
      </View>

    )
  } return <View />
}
