import React from "react";
import { Alert, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextAlert from "../../components/TextAlert";
import styles from "./styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { birthday,phoneNumber } from "../../utils/validations";
import { server } from "../../config/environment";

export default function SignUp(){
    /**
     * Método responsável por passar os dados do cadastro para o backend
     */
    async function registerUser(values){
        await fetch(`${server.host}:${server.port}/sign-up`,{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cpf: values.cpf,
                name : values.name,
                email : values.email,
                birthday : values.birthday,
                phoneNumber : values.phoneNumber,
                password : values.password
            })
        });
    }

    //YUP -- MENSAGENS DE VALIDAÇÃO
    const schema = Yup.object().shape({
        cpf : Yup.string()
        .max(14,({max}) => `Máximo de ${max} caractéres`)
        .required('*Campo obrigatório'),
        name : Yup.string()
        .min(2,({min}) =>`Mínimo de ${min} caractéres`)
        .max(20,({max}) => `No máximo ${max} caractéres`)
        .required('*Campo obrigatório'),
        email: Yup.string()
        .email('Formato incorreto')
        .required('*Campo obrigatório'),
        birthday: Yup.string()
        .matches(birthday,'*Formato dd/mm/aaaa'),
        phoneNumber: Yup.string()
        .matches(phoneNumber,"*Formato (99) 99999-9999")
        .required('*Campo obrigatório'),
        password: Yup.string()
        .min(8,({min}) => `Mínimo de ${min} caractéres`)
        .max(16,({max}) => `No máximo ${max} caractéres`)
        .required('*Campo obrigatório'),
        checkPass: Yup.string()
        .oneOf([Yup.ref('password'),null], '*As senhas devem ser iguais')
        .required('*Campo obrigatório')
    });

    //USEFORMIK
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        //PASSA O YUP PARA O USEFORMIK
        validationSchema: schema,
        initialValues:{
            cpf: '',
            name: '',
            email: '',
            birthday: '',
            phoneNumber: '',
            password: '',
            checkPass: ''
        },
        onSubmit: (values) => registerUser(values)
    });

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                
                <View style={styles.boxForm}>
            
                    <Text style={styles.label}>CPF</Text>
                    <TextInput style={styles.input}
                        keyboardType="decimal-pad"
                        placeholder="000.000.000-00"
                        onChangeText={handleChange('cpf')}
                        onBlur={handleBlur('cpf')}
                        touched={touched.cpf} />
                    {touched.cpf && errors.cpf ? <TextAlert error={errors.cpf}/> : ''}


                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="Juba de Leão"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        touched={touched.name} />
                    {touched.name && errors.name ? <TextAlert error={errors.name}/> : ''}

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.input}
                        keyboardType="email-address"
                        placeholder="jubasdeleao@exemplo.com"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        touched={touched.email} />
                    {touched.email && errors.email ? <TextAlert error={errors.email}/> : ''}

                    <Text style={styles.label}>Data de Nascimento</Text>
                    <TextInput style={styles.input}
                        keyboardType="numeric"
                        placeholder="01/01/2001"
                        onChangeText={handleChange('birthday')}
                        onBlur={handleBlur('birthday')}
                        touched={touched.birthday} />
                    {touched.birthday && !errors.birthday? <Text style={styles.phoneAlert}>Campo opcional</Text> : <TextAlert error={errors.birthday}/> }

                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input}
                        keyboardType="number-pad"
                        placeholder="(61) 99999-9999"
                        onBlur={handleBlur('phoneNumber')}
                        onChangeText={handleChange('phoneNumber')} />
                    {touched.phoneNumber && errors.phoneNumber ? <TextAlert error={errors.phoneNumber}/> : ''}
                    
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="********"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        touched={touched.password} />
                    {touched.password && errors.password ? <TextAlert error={errors.password}/> : ''}
                    
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="********"
                        secureTextEntry={true}
                        onChangeText={handleChange('checkPass')}
                        touched={touched.checkPass} />
                    {touched.checkPass && errors.checkPass ? <TextAlert error={errors.checkPass}/> : ''}
                
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

