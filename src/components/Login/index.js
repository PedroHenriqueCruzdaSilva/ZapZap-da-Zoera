import React from "react";
import { auth, provider } from '../../services/firebase';
import * as C from './styles';

const Login = () => {

    const handleSingin = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return(
        <C.Container>
            <C.Button onClick={handleSingin}>Faça login com o Google</C.Button>
        </C.Container>
    )
}

export default Login;