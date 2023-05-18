import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextAlert from "../components/TextAlert";
import env from "../../env.json"
import regx from "../utils/validation";
import mask from "../utils/mask"

export default function SignUp({ navigation }) {
    /**
     * Método responsável por realizar o cadastro do cliente
     */
    const [user, setUser] = useState({
        cpf: '',
        name: '',
        email: '',
        birthday: '',
        phoneNumber: '',
        password: '',
        checkPass: ''
    })

    const [errors, setErrors] = useState({
        cpf: false,
        name: false,
        email: false,
        birthday: false,
        phoneNumber: false,
        password: false,
    });

    const message = "*Campo obrigatório"


    function validateForm() {
        if (!regx.cpf.test(user.cpf)) {
            setErrors(prevState => ({ ...prevState, cpf: true }))
        } else {
            setErrors(prevState => ({ ...prevState, cpf: false }))
        }
        if (!regx.name.test(user.name)) {
            setErrors(prevState => ({ ...prevState, name: false }))
        } else {
            setErrors(prevState => ({ ...prevState, name: false }))
        }
        if (!regx.email.test(user.email)) {
            setErrors(prevState => ({ ...prevState, email: false }))
        } else {
            setErrors(prevState => ({ ...prevState, email: false }))
        }
        if (!regx.birthday.test(user.birthday)) {
            setErrors(prevState => ({ ...prevState, birthday: true }))
        } else {
            setErrors(prevState => ({ ...prevState, birthday: false }))
        }
        if (!regx.phone.test(user.phoneNumber)) {
            setErrors(prevState => ({ ...prevState, phoneNumber: true }))
        } else {
            setErrors(prevState => ({ ...prevState, phoneNumber: false }))
        }
        if (user.password != user.checkPass || user.password == '' || user.checkPass == '') {
            setErrors(prevState => ({ ...prevState, password: true, checkPass: true }))
        } else {
            setErrors(prevState => ({ ...prevState, password: false, checkPass: false }))
        }
        sendForm()
    }

    async function sendForm() {
        //VERIFICAÇÃO DE INPUTS
        if (Object.values(errors).includes(true) === false) {
            const response = await fetch(`${env.host}/users/sign-up`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const json = await response.json();
            if (response.status === 201) {
                alert(json.message)
                navigation.navigate("Login")
            } else {
                alert(json.message)
            }
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView style>
                <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                    <View>

                        <Text style={styles.label}>CPF</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholder="000.000.000-00"
                            placeholderTextColor="#161c2660"
                            maxLength={14}
                            value={user.cpf}
                            onChangeText={value => setUser(prevState => ({ ...prevState, cpf: mask.cpf(value) }))}
                        />

                        {errors.cpf ? <TextAlert error={message} /> : ''}


                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="Juba de Leão"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            value={user.name}
                            onChangeText={value => { setUser(prevState => ({ ...prevState, name: mask.name(value) })) }}
                        />
                        {errors.name ? <TextAlert error={message} /> : ''}

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput style={styles.input}
                            keyboardType="email-address"
                            placeholder="jubasdeleao@exemplo.com"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            value={user.email}
                            onChangeText={value => setUser(prevState => ({ ...prevState, email: value }))}
                        />
                        {errors.email ? <TextAlert error={message} /> : ''}

                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder="01/01/2001"
                            placeholderTextColor="#161c2660"
                            maxLength={10}
                            value={user.birthday}
                            onChangeText={value => setUser(prevState => ({ ...prevState, birthday: mask.date(value) }))}
                        />
                        {errors.birthday ? <TextAlert error={message} /> : ''}

                        <Text style={styles.label}>Telefone</Text>
                        <TextInput style={styles.input}
                            keyboardType="number-pad"
                            placeholder="(61) 99999-9999"
                            placeholderTextColor="#161c2660"
                            maxLength={14}
                            value={user.phoneNumber}
                            onChangeText={value => setUser(prevState => ({ ...prevState, phoneNumber: mask.phone(value) }))}
                        />
                        {/*touched.phoneNumber && errors.phoneNumber ? <TextAlert error={errors.phoneNumber} /> : ''*/}

                        <Text style={styles.label}>Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={value => setUser(prevState => ({ ...prevState, password: value }))}
                        />
                        {errors.password ? <TextAlert error={message} /> : ''}

                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={value => setUser(prevState => ({ ...prevState, checkPass: value }))}
                        />
                        {errors.checkPass ? <TextAlert error={message} /> : ''}

                        <TouchableOpacity style={styles.button} onPress={() => validateForm()}>
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
    label: {
        color: '#161c26',
        paddingTop: 5
    },
    input: {
        backgroundColor: '#ccced9',
        borderRadius: 6,
        borderWidth: 1,
        color: '#000000',
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
