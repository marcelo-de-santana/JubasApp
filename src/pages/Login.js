import React, { useState } from 'react';
import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TextAlert from "../components/TextAlert"
import env from "../../env.json"
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login({ navigation }) {
    const [errorMessage, setErrorMessage] = useState(null);

    /**
     * Método responsável por validar o acesso do usuário
     */
    async function validateLogin(values) {
        const response = await fetch(`${env.host}/client/check-in`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        });
        const json = await response.json();
        if (response.status == 200) {
            setErrorMessage(null);
            navigation.navigate('Schedule');
        } else {
            setErrorMessage(json.message);
        }
    }


    //VALIDAÇÃO DE INPUTS
    const schema = Yup.object().shape({
        email: Yup.string().email(' ')
            .required('*Campo obrigatório'),
        password: Yup.string().min(8, ({ min }) => `Mínimo de ${min} dígitos`)
            .required('*Campo obrigatório'),
    });

    //VALIDAÇÃO VIA FORMIK
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => validateLogin(values)
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Juba's Barbearia</Text>
                        <Image style={styles.logo} source={require('../assets/images/logoMarca.jpg')} />
                        {errorMessage != null ? <Text style={styles.errorMsg}>{errorMessage}</Text> : ''}
                    </View>

                    <View style={styles.body}>
                        <View style={styles.inputBox}>

                            <Text style={styles.label}>Digite seu E-mail</Text>
                            <TextInput style={styles.input} keyboardType='email-address' placeholder='jubadeleao@exemplo.com'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email} />
                            {touched.email && errors.email ? <TextAlert error={errors.email} /> : ''}
                        </View>

                        <View style={styles.inputBox}>

                            <Text style={styles.label}>Digite sua senha</Text>
                            <TextInput style={styles.input} secureTextEntry={true} placeholder='**********'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password} />
                            {touched.password && errors.password ? <TextAlert error={errors.password} /> : ''}

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.footer}>

                        <TouchableOpacity style={styles.buttonPassword} onPress={() => navigation.navigate('Schedule')}>
                            <Text>Esqueci minha senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.buttonRegister}>Não possui uma conta? Cadastre-se</Text>
                        </TouchableOpacity>

                    </View>

                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "auto",
        backgroundColor:"#423e3c",

    },
    header: {
        alignItems: "center",
        marginTop: 80,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 150,
    },
    body: {
        height: 220,
    },
    inputBox: {
        alignItems: "center",
        height: 85,
    },
    label: {
        fontSize: 14,
        marginBottom: 3,
        width: "80%",
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 0.8,
        borderRadius: 6,
        padding: 10,
    },
    errorMsg: {
        fontSize: 12,
        color: 'red',
        paddingTop: 10,
        textAlign: "center",
        width: "80%"
    },
    button: {
        backgroundColor: "#5EA28B",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 15,
        width: "80%",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center",
    },
    footer: {
        height: 230,
    },
    buttonPassword: {
        alignItems: "center",
        marginBottom: 15,
    },
    buttonRegister: {
        textAlign: "center",
    },

})
