import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: { width: 150, height: 150 },
  erro: { color: 'red' },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: { width: '100%', paddingHorizontal: 20 },
  inputErro: { textAlign: 'right', color: 'red', width: '100%' },
  label: { textAlign: 'left', color: '#0d2b56', width: '100%' },
  btn: { width: 100 },
  btnImagePicker: { width: 140 },
})
