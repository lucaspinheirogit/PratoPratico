import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ImgContainer: {
    height: 208,
    width: 208,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#184890',
    marginTop: 10
  },
  Img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  erro: { color: 'red' },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: { width: '100%', paddingHorizontal: 20 },
  inputErro: { textAlign: 'right', color: 'red', width: '100%' },
  label: { textAlign: 'left', color: '#0d2b56', width: '100%' },
  btnAtualizar: { width: 100 },
  btnImagePicker: { width: 140 },
  greenText: { color: 'lightgreen' },
});
