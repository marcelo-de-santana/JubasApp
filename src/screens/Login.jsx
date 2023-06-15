import { useAuth } from '../contexts/auth';
import { useState } from 'react';
import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFormik } from "formik";
import { authFormSchema } from "../utils/formSchema";
import { global } from "../components/styles/global";
import TextAlert from "../components/TextAlert";
import mask from "../utils/mask";
import env from "../../env.json";

export default function Login({ navigation }) {
    const { openSession } = useAuth();
    const [errorMessage, setErrorMessage] = useState(false);
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        validationSchema: authFormSchema,
        initialValues: {
            cpf: '',
            password: ''
        },
        onSubmit: validateLogin
    });
    async function validateLogin(values) {
        const response = await fetch(`${env.host}/user/sign-in`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const json = await response.json();
        if (response.status == 200) {
            openSession(json.credentials)
        } else {
            setErrorMessage(json.message);
        }
    }


    return (
        <SafeAreaView style={global.container}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Pressable onPress={Keyboard.dismiss} style={global.horizontalMargins}>
                        <View style={{ alignItems: 'center', paddingVertical: '15%' }}>
                            <Text style={global.blackTextLarge}>Juba's Barbearia</Text>
                            <Image style={global.logo} source={require('../assets/images/logoMarca.png')} />
                            {errorMessage && <Text style={{ fontSize: 14, color: 'red', paddingVertical: 5 }}>{errorMessage}</Text>}
                        </View>
                        <Text style={global.label}>Digite seu CPF</Text>
                        <TextInput style={global.input} keyboardType='numeric' placeholder='123.456.789-10'
                            placeholderTextColor="#161C2660"
                            maxLength={14}
                            value={mask.cpf(values.cpf)}
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                        />
                        {touched.cpf && errors.cpf && <TextAlert error={errors.cpf} />}
                        <Text style={global.label}>Digite sua senha</Text>
                        <TextInput style={global.input} secureTextEntry={true} placeholder='**********'
                            placeholderTextColor="#161C2660"
                            maxLength={20}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} />
                        {touched.password && errors.password && <TextAlert error={errors.password} />}

                        <View style={{ paddingTop: 15 }}>
                            <TouchableOpacity style={global.button} onPress={() => handleSubmit()}>
                                <Text style={global.textButton}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                    <View style={global.boxFooter}>
                        <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
                            <Text style={global.darkBlueTextSmallCenter}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={global.footerBottom}>
                            <Text style={global.darkBlueTextSmallCenter}>Não possui uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}