import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  label: {
    textAlign: 'left',
    color: '#0d2b56',
    width: '100%',
  },
  opcional: {
    textAlign: 'left',
    color: '#0d2b56',
    width: '100%',
    fontSize: 12,
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  center: { textAlign: 'center' },
  marginTop150: { marginTop: 150 },
  paddingY10: { paddingVertical: 10 },
  selectContainer: {
    height: 45,
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderColor: '#184890',
    borderRadius: 10,
  },
  selectColor: { color: '#0d2b56' },
  btnBuscar: { alignSelf: 'flex-end', width: 100 },
  inputErro: { textAlign: 'right', color: 'red', width: '100%' },
})
