import { useState } from 'react';
import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TextAlert from "../components/TextAlert"
import env from "../../env.json"
import { useFormik } from "formik";
import * as Yup from "yup";
import * as validation from "../utils/validations"
import * as regx from "../utils/regularExpressions"

export default function Login({ navigation }) {
    const [errorMessage, setErrorMessage] = useState(null);

    /**
     * Método responsável por validar o acesso do usuário
     */
    async function validateLogin(values) {
        const response = await fetch(`${env.host}/users/sign-in`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: values.cpf,
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
        cpf: Yup.string()
            .matches(regx.cpfNumber, '*Campo obrigatório')
            .min(14, '*Campo obrigatório')
            .max(14, '*Campo obrigatório')
            .required('*Campo obrigatório'),
        password: Yup.string()
            .min(8, ({ min }) => `Mínimo de ${min} caractéres`)
            .max(20, ({ max }) => `No máximo ${max} caractéres`)
            .required('*Campo obrigatório'),
    });

    //VALIDAÇÃO VIA FORMIK
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        validationSchema: schema,
        initialValues: {
            cpf: '',
            password: ''
        },
        onSubmit: (values) => validateLogin(values)
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable onPress={Keyboard.dismiss}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Juba's Barbearia</Text>
                        <Image style={styles.logo} source={require('../assets/images/logoMarca.png')} />
                    </View>

                    <View style={styles.body}>
                        {errorMessage != null ? <Text style={styles.errorMsg}>{errorMessage}</Text> : ''}

                        <Text style={styles.label}>Digite seu CPF</Text>
                        <TextInput style={styles.input} keyboardType='numeric' placeholder='123.456.789-10'
                            placeholderTextColor="#161c2660"
                            maxLength={14}
                            value={validation.cpf(values.cpf)}
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                        />
                        {touched.cpf && errors.cpf ? <TextAlert error={errors.cpf} /> : ''}


                        <Text style={styles.label}>Digite sua senha</Text>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder='**********'
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} />
                        {touched.password && errors.password ? <TextAlert error={errors.password} /> : ''}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.footer}>

                        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                            <Text style={styles.textButtonPassword}>Esqueci minha senha</Text>
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
        backgroundColor: '#f2f2f2',
    },
    header: {
        alignItems: "center",
        marginTop: 80,
    },
    headerText: {
        color: "#161c26",
        fontSize: 20,
    },
    logo: {
        backgroundColor: "#ccced9",
        borderRadius: 4,
        marginTop: 20,
        height: 150,
        width: 120,
    },
    body: {
        alignItems: "center",
        marginTop: 24,
    },
    errorMsg: {
        fontSize: 12,
        color: '#f81c1c',
        textAlign: "center",
    },
    label: {
        color: "#161c26",
        fontSize: 14,
        marginTop: 15,
        width: "80%",
    },
    input: {
        backgroundColor: "#ccced9",
        borderWidth: 0.8,
        borderRadius: 6,
        color: "#161c26",
        height: 40,
        padding: 10,
        width: "80%",
    },
    button: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 20,
        width: "80%",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center",
    },
    footer: {
        alignItems: 'center',
        height: 200,
        marginTop: 25,
        justifyContent: 'space-between'
    },
    textButtonPassword: {
        color: '#161c26',
    },
    buttonRegister: {
        color: '#161c26',
    },

})
