import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: { width: 300, height: 300 },
  loginView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnLogin: { minWidth: 80 },
  message: { marginTop: 15 },
  signInContainer: {
    flexDirection: 'row'
  }
});
