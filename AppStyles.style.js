
import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  //Orange: #EEB959
  //Dark Grey : #424242
  //Light Yellow: #FDFCEC
  //Black: #0D0706
  navigation: {
    backgroundColor: '#EEB959',
    height: '10%'
  },
  defaultContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '12%',
    width: '85%',
    height: '80%',
},
  componentWrapper:{
    height: '100%',
    width: '100%',
    backgroundColor: '#FDFCEC',
  },
  defaultButton:{
    backgroundColor: '#424242',
  },
  scrollView: {
    height: '80%',
    width: '90%',
    backgroundColor: '#FDFCEC',
    borderRadius: 20
  },
  scrollViewElement: {
    width: '100%',
  },
});

export default defaultStyles;
