import React, { useState } from 'react';
import {Image, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TextAlert from "../../components/TextAlert"
import styles from './styles';
import { useFormik } from "formik";
import * as Yup from "yup";
import {server} from "../../config/environment";

export default function Login({navigation}){

    const [errorMessage, setErrorMessage] = useState(null);

    /**
     * Método responsável por verificar se o usuário possui cadastro no sistema
     */
    async function validateLogin(values){
        try {
            const response = await fetch(`${server.host}:${server.port}/check-in`,{
                method:"POST",
                headers:{
                    Accept : 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            });
            //RESPOSTA DO SERVIDOR(PROMISSE)
            const json = await response.json();
           
            //CONFERE CADASTRO
            if(json.valor != 0){
                navigation.navigate('Schedule');
            }else{
                setErrorMessage(true);
            }

        //ERROR DE REQUISIÇÃO DO SERVIDOR
        }catch(error){
            console.error(error)
        }

    }

    //VALIDAÇÃO DE INPUTS
    const schema = Yup.object().shape({
        email: Yup.string().email(' ')
        .required('*Campo obrigatório'),
        password: Yup.string().min(8, ({min}) => `Mínimo de ${min} dígitos`)
        .required('*Campo obrigatório'),
    });

    //VALIDAÇÃO VIA FORMIK
    const {handleChange, handleBlur, handleSubmit, values, errors, touched} = useFormik({
        validationSchema : schema,
        initialValues:{
            email: '',
            password: ''
        },
        onSubmit: (values) => validateLogin(values)  
    });
  
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Juba's Barbearia</Text>
                    <Image style={styles.logo} source={require('../../assets/img/logoMarca.jpg')}/>
                    {errorMessage != null ? <Text style={styles.errorMsg}>E-mail e/ou Senha Inválidos</Text> : ''}
                </View>

                <View style={styles.body}>
                    <View style={styles.inputBox}>

                        <Text style={styles.label}>Digite seu E-mail</Text>
                        <TextInput style={styles.input} keyboardType='email-address' placeholder='jubadeleao@exemplo.com'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}/>
                        {touched.email && errors.email ? <TextAlert error={errors.email}/> : ''}
                    </View>  

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>Digite sua senha</Text>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder='**********'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}/>
                        {touched.password && errors.password ? <TextAlert error={errors.password}/> : ''}
                        
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            
                <View style={styles.footer}>    
            
                    <TouchableOpacity style={styles.buttonPassword} onPress={()=>navigation.navigate('Schedule')}>
                        <Text>Esqueci minha senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                        <Text style={styles.buttonRegister}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
            
                </View>

            </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
