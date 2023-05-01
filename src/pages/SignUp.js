import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextAlert from "../components/TextAlert";
import env from "../../env.json"
import * as Yup from "yup";
import { useFormik } from "formik";
import * as regx from "../utils/regularExpressions";
import * as mask from "../utils/validations"

export default function MyAccount({ navigation }) {
    /**
     * Método responsável por buscar os dados e realizar o cadastro do cliente
     */
    async function registerUser(values) {

        const response = await fetch(`${env.host}/client/sign-up`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
    
        const json = await response.json();

        if (response.status == 201) {
            navigation.navigate('Login')
            alert(json.message)
        } else {
            alert(json.message)
        }

    }

    //YUP -- MENSAGENS DE VALIDAÇÃO
    const schema = Yup.object().shape({
        cpf: Yup.string()
            .matches(regx.cpfNumber, '*Campo obrigatório')
            .min(14, '*Campo obrigatório')
            .max(14, '*Campo obrigatório')
            .required('*Campo obrigatório'),
        name: Yup.string()
            .min(7, '*Campo obrigatório')
            .max(50, ({ max }) => `Máximo de ${max} caractéres`)
            .required('*Campo obrigatório'),
        email: Yup.string()
            .email('*Campo obrigatório')
            .max(50, ({ max }) => `Máximo de ${max} caractéres`)
            .required('*Campo obrigatório'),
        birthday: Yup.string()
            .min(10, "*Campo obrigatório")
            .matches(regx.birthday, '*Formato dd/mm/aaaa'),
        phoneNumber: Yup.string()
            .matches(regx.phoneNumber, "*Campo obrigatório")
            .min(14, "*Campo obrigatório")
            .max(15, '*Campo obrigatório')
            .required('*Campo obrigatório'),
        password: Yup.string()
            .min(8, ({ min }) => `Mínimo de ${min} caractéres`)
            .max(20, ({ max }) => `No máximo ${max} caractéres`)
            .required('*Campo obrigatório'),
        checkPass: Yup.string()
            .oneOf([Yup.ref('password'), null], '*As senhas devem ser iguais')
            .required('*Campo obrigatório')
    });

    //USEFORMIK
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        //PASSA O YUP PARA O USEFORMIK
        validationSchema: schema,
        initialValues: {
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

    return (
        <View style={styles.container}>
            <ScrollView style>
                <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                    <View style={styles.boxForm}>

                        <Text style={styles.label}>CPF</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholder="000.000.000-00"
                            placeholderTextColor="#161c2660"
                            maxLength={14}
                            value={mask.cpf(values.cpf)}
                            onChangeText={handleChange('cpf')}
                            touched={touched.cpf}

                        />

                        {touched.cpf && errors.cpf ? <TextAlert error={errors.cpf} /> : ''}


                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="Juba de Leão"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            value={values.name.replace(/[0-9+-]+/, '')}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            touched={touched.name} />
                        {touched.name && errors.name ? <TextAlert error={errors.name} /> : ''}

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput style={styles.input}
                            keyboardType="email-address"
                            placeholder="jubasdeleao@exemplo.com"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            touched={touched.email} />
                        {touched.email && errors.email ? <TextAlert error={errors.email} /> : ''}

                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder="01/01/2001"
                            onChangeText={handleChange('birthday')}
                            placeholderTextColor="#161c2660"
                            maxLength={10}
                            value={mask.birthday(values.birthday)}
                            onBlur={handleBlur('birthday')}
                            touched={touched.birthday} />
                        {touched.birthday && errors.birthday ? <TextAlert error={errors.birthday} /> : ''}

                        <Text style={styles.label}>Telefone</Text>
                        <TextInput style={styles.input}
                            keyboardType="number-pad"
                            placeholder="(61) 99999-9999"
                            placeholderTextColor="#161c2660"
                            maxLength={15}
                            value={mask.phone(values.phoneNumber)}
                            onBlur={handleBlur('phoneNumber')}
                            onChangeText={handleChange('phoneNumber')} />
                        {touched.phoneNumber && errors.phoneNumber ? <TextAlert error={errors.phoneNumber} /> : ''}

                        <Text style={styles.label}>Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            touched={touched.password} />
                        {touched.password && errors.password ? <TextAlert error={errors.password} /> : ''}

                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={handleChange('checkPass')}
                            touched={touched.checkPass} />
                        {touched.checkPass && errors.checkPass ? <TextAlert error={errors.checkPass} /> : ''}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.textButton}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? 0 : 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    boxForm: {
    },
    label: {
        color: '#161c26',
        paddingTop: 5
    },
    input: {
        backgroundColor: '#ccced9',
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        paddingLeft: 10,
    },
    phoneAlert: {

        fontSize: 12,
        color: '#161c26'
    },
    button: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 20,
    },
    textButton: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 18
    },
})