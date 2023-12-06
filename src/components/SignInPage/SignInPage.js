import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NativeBaseProvider, Box } from 'native-base';
import { auth } from '../../../App'

const SignInPage = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => { //Remember it checks authentication page users, not users collection
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const userName = userCredential.name;
          console.log(userName);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    };

    return (
        <NativeBaseProvider>
            <Box style={{marginTop: '30%'}}>
                <TextInput
                    placeholder="Login"
                    value={email}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title="Sign In" onPress={handleSignIn} />
            </Box>

        </NativeBaseProvider>
    );
};

export default SignInPage;
