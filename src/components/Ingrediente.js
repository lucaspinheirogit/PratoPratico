import React from 'react';
import { View, StyleSheet } from 'react-native';

import { H6 } from '../styled-components/Texto';

const Ingrediente = ({ nome, quantidade, unidade }) => (
  <View style={styles.ingredientesBox}>
    <View style={styles.ingredientesColuna}>
      <H6 style={{ color: '#000' }}>{nome}</H6>
    </View>
    <View style={styles.ingredientesColuna}>
      <H6 style={{ color: '#000' }}>{quantidade}</H6>
    </View>
    <View style={styles.ingredientesColuna}>
      <H6 style={{ color: '#000' }}>{unidade}</H6>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ingredientesBox: {
    width: '100%',
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  ingredientesColuna: {
    flex: 1,
    alignItems: 'center',
    color: '#000',
  },
});

export default Ingrediente;
