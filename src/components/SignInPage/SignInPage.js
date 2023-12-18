import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { NativeBaseProvider, Box, Text, Input, Button, Image } from 'native-base';
import { auth } from '../../../App'
import AppStyles from '../../../AppStyles.style';
import signInPageStyles from './SignInPage.style';
const SignInPage = ({ setUserLoggedIn }) => {
    const [email, setEmail] = useState("ghex@gmail.com"); //TEST
    const [password, setPassword] = useState("secretPassword");
    let [noAccount, setNoAccount] = useState(false);

    const handleSignIn = async () => {
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserLoggedIn(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    };
    const switchSignInSignUp = () => {
        setNoAccount((prevNoAccount) => !prevNoAccount);
    };
    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserLoggedIn(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    return (
        <NativeBaseProvider>
            <Box style={AppStyles.componentWrapper}>
                <Box style={AppStyles.defaultContainer}>
                    <Box style={signInPageStyles.logoPlaceholder} >
                        <Image
                            source={require('../../../assets/logo.png')}
                            style={{ width: '85%', height: '100%' }}
                        />
                    </Box>
                    {!noAccount ? (
                        <Box style={{ height: '62.5%' }}>
                            <Box style={signInPageStyles.inputFieldsContainer}>
                                <Box style={signInPageStyles.inputFieldStyle}>
                                    <Input
                                        placeholder="E-mail"
                                        value={email}
                                        onChangeText={setEmail}
                                        size="xl"
                                    />
                                </Box>
                                <Box style={signInPageStyles.inputFieldStyle}>
                                    <Input
                                        placeholder="Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        size="xl"
                                    />
                                </Box>

                            </Box>
                            <Box style={signInPageStyles.buttonsSectionContainer}>
                                <Box>
                                    <Button style={AppStyles.buttonDefault}
                                        onPress={handleSignIn}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                                <Box style={{ marginTop: '5%' }}>
                                    <Button style={AppStyles.buttonDefault}
                                        onPress={switchSignInSignUp}>
                                        No account?
                                    </Button>
                                </Box>

                            </Box>
                        </Box>
                    ) : (
                        <Box style={{ height: '62.5%' }}>
                            <Box style={signInPageStyles.inputFieldsContainer}>
                                <Box style={signInPageStyles.inputFieldStyle}>
                                    <Input
                                        placeholder="E-mail"
                                        value={email}
                                        onChangeText={setEmail}
                                        size="xl"
                                    />
                                </Box>
                                <Box style={signInPageStyles.inputFieldStyle}>
                                    <Input
                                        placeholder="Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        size="xl"
                                    />
                                </Box>

                            </Box>
                            <Box style={signInPageStyles.buttonsSectionContainer}>
                                <Box>
                                    <Button style={AppStyles.buttonDefault}
                                        onPress={handleSignUp}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                                <Box style={{ marginTop: '5%' }}>
                                    <Button style={AppStyles.buttonDefault}
                                        onPress={switchSignInSignUp}>
                                        Go back
                                    </Button>
                                </Box>

                            </Box>
                        </Box>
                    )
                    }
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};


export default SignInPage;
