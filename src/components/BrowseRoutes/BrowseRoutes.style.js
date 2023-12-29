import { StyleSheet } from "react-native";

const browseRoutesStyles = StyleSheet.create({
  panel: {
    height: '100%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15%',
    backgroundColor: '#EEB959',
    borderRadius: 20,
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
  dot: {
    backgroundColor: '#0D0706',
    height: '40%',
    width: '5%',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 50,
    marginLeft: '5%'
  },
  routeButton: {
    backgroundColor: '#EEB959',
    width: '80%',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  }

});

export default browseRoutesStyles;