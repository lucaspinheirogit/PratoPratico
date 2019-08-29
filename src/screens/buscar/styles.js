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
  btnBuscarFull: {
    borderRadius: 0,
    borderWidth: 0,
    alignSelf: 'stretch',
    marginVertical: 0,
    marginHorizontal: 0,
    height: 42,
    backgroundColor: '#0d2b56',
    justifyContent: 'center',
    // #0d2b56 #113870 #305c9b
  },
  inputErro: { textAlign: 'right', color: 'red', width: '100%' },
  flex1: { flex: 1 },
})
