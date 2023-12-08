import { StyleSheet } from 'react-native';

const signInPageStyles = StyleSheet.create({
    logoPlaceholder: {
        width: '100%',
        height: '45%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15%',
        backgroundColor: '#EEB959',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputFieldsContainer: {
        marginTop: '10%',
        paddingTop: '5%',
        height: '20%',
    },
    buttonsSectionContainer: {
        position: 'absolute',
        bottom: '5%',
        left: 0,
        right: 0,
        marginBottom: '10%',
        padding: '5%',
    },
    inputFieldStyle: {
        marginTop: '5%'
    },
});

export default signInPageStyles;
