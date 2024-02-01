import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { NativeBaseProvider, Box, Text, Input, Button, Image, Column } from 'native-base';
import { auth } from '../../../App'
import AppStyles from '../../../AppStyles.style';
import signInPageStyles from './WelcomePage.styles';
import { Alert } from 'react-native';

const WelcomePage = ({ setUserLoggedIn, setUserSignUp, setLoading }) => {
    const [email, setEmail] = useState(""); //TEST
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    let [noAccount, setNoAccount] = useState(false);

    const handleSignIn = async () => {
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserLoggedIn(true);
                setLoading(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                setErrorMessage("Incorrect email or password"); // Set error message
                Alert.alert("Error", "Incorrect email or password"); // Show alert for error
            });
    };

    const switchSignInSignUp = () => {
        setNoAccount((prevNoAccount) => !prevNoAccount);
    };

    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserSignUp(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                setErrorMessage("Error signing up"); // Set error message
                Alert.alert("Error", "Error signing up"); // Show alert for error
            });
    };
    const handleForgotPassword = async () => {
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                Alert.alert("Email sent", "Check your email for password reset instructions in a few minutes. If you don't receive an email, please check your spam folder.");
                setForgotPassword(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                setErrorMessage("Error sending email"); // Set error message
                Alert.alert("Error", "Error sending email"); // Show alert for error
            });
    };

    return (
        <NativeBaseProvider>
            <Box style={AppStyles.componentWrapper}>
                <Box style={AppStyles.defaultContainer}>
                    <Box style={signInPageStyles.logoPlaceholder} >
                        <Image
                            source={require('../../../assets/ClimbTogether-Logo.png')}
                            style={{ width: '90%', height: '100%' }}
                        />
                    </Box>
                    {forgotPassword ? (
                        <Column space={5}>
                            <Box style={signInPageStyles.inputFieldStyle}>
                                <Input
                                    placeholder="Email"
                                    value={resetEmail}
                                    onChangeText={setResetEmail}
                                    size="xl"
                                />
                            </Box>
                            <Button style={AppStyles.defaultButton}
                                onPress={handleForgotPassword}>
                                Send Email
                            </Button>
                            <Button style={AppStyles.defaultButton}
                                onPress={() => setForgotPassword(false)}>
                                Go back
                            </Button>

                        </Column>
                    ) : !noAccount ? (
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
                                        secureTextEntry={true}
                                    />
                                </Box>
                            </Box>
                            <Box style={signInPageStyles.buttonsSectionContainer}>
                                <Box>
                                    <Button style={AppStyles.defaultButton}
                                        onPress={handleSignIn}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                                <Box style={{ marginTop: '5%' }}>
                                    <Button style={AppStyles.defaultButton}
                                        onPress={switchSignInSignUp}>
                                        No account?
                                    </Button>
                                </Box>
                                <Box style={{ marginTop: '5%' }}>
                                    <Button style={AppStyles.defaultButton}
                                        onPress={() => setForgotPassword(true)}>
                                        Forgot password?
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
                                        secureTextEntry={true}
                                    />
                                    {errorMessage !== "" && (
                                        <Text style={signInPageStyles.errorMessage}>{errorMessage}</Text>
                                    )}
                                </Box>
                            </Box>
                            <Box style={signInPageStyles.buttonsSectionContainer}>
                                <Box>
                                    <Button style={AppStyles.defaultButton}
                                        onPress={handleSignUp}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                                <Box style={{ marginTop: '5%' }}>
                                    <Button style={AppStyles.defaultButton}
                                        onPress={switchSignInSignUp}>
                                        Go back
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}

                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default WelcomePage;
