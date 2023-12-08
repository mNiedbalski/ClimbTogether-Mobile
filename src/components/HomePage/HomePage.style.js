import { StyleSheet, Dimensions } from 'react-native';

const homePageStyles = StyleSheet.create({
    //Orange: #EEB959
  //Dark Grey : #424242
  //Light Yellow: #FDFCEC
  //Black: #0D0706
  //width: `${experiencePercentage}%`,
    statsPanel: {
      height: '85%',
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '15%',
      backgroundColor: '#EEB959',
      borderRadius: 20,
    },
    statLabelField:{
      height: '100%',
    },
    statField:{
      backgroundColor: '#D9D9D9',
      borderRadius: 10,
      height: '20%',
    },
    statLabelAndFieldWrapper:{
      marginTop: '10%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
    }
  });
  
  export default homePageStyles;