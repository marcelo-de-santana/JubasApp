import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextAlert from "../components/TextAlert";
import env from "../../env.json"
import * as regx from "../utils/regularExpressions";
import * as mask from "../utils/validations"

export default function MyAccount({ navigation }) {
    /**
     * Método responsável por realizar o cadastro do cliente
     */
    const [user,setUser] = useState({
		cpf: '',
		name: '',
		email: '',
		birthday: '',
		phoneNumber: '',
		password: '',
		checkPass: ''
    })

    async function sendForm() {
    console.log(user)
        const response = await fetch(`${env.host}/client/sign-up`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
 	});
        const json = await response.json();

        if (response.status == 201) {
            navigation.navigate('Login')
            alert(json.message)
        } else {
            alert(json.message)
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
                            onChangeText={value => setUser (prevState => ({...prevState, cpf: mask.cpf(value)}))}
                        />

                        {/*touched.cpf && errors.cpf ? <TextAlert error={errors.cpf} /> : ''*/}


                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="Juba de Leão"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            value={user.name/**/}
                            onChangeText={value => {setUser(prevState => ({...prevState,name: (value)}))}}
                        />
                        {/*touched.name && errors.name ? <TextAlert error={errors.name} /> : ''*/}

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput style={styles.input}
                            keyboardType="email-address"
                            placeholder="jubasdeleao@exemplo.com"
                            placeholderTextColor="#161c2660"
                            maxLength={50}
                            value={user.email}
			    onChangeText={value => setUser(prevState => ({...prevState, email: value}))}
          		/>
                        {/*touched.email && errors.email ? <TextAlert error={errors.email} /> : ''*/}

                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder="01/01/2001"
                            placeholderTextColor="#161c2660"
                            maxLength={10}
                            value={user.birthday}
			    onChangeText={value => setUser(prevState => ({...prevState, birthday:value}))}
			/>
                        {/*touched.birthday && errors.birthday ? <TextAlert error={errors.birthday} /> : ''*/}

                        <Text style={styles.label}>Telefone</Text>
                        <TextInput style={styles.input}
                            keyboardType="number-pad"
                            placeholder="(61) 99999-9999"
                            placeholderTextColor="#161c2660"
                            maxLength={14}
                            value={user.phoneNumber}
                            onChangeText={value => setUser(prevState => ({...prevState, phoneNumber: mask.phone(value)}))}
			/>
                        {/*touched.phoneNumber && errors.phoneNumber ? <TextAlert error={errors.phoneNumber} /> : ''*/}

                        <Text style={styles.label}>Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={value => setUser(prevState => ({...prevState,password:value}))}
			/>
                        {/*touched.password && errors.password ? <TextAlert error={errors.password} /> : ''*/}

                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="********"
                            placeholderTextColor="#161c2660"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={value => setUser(prevState => ({...prevState,checkPass:value}))}
			/>
                        {/*touched.checkPass && errors.checkPass ? <TextAlert error={errors.checkPass} /> : ''*/}

                        <TouchableOpacity style={styles.button} onPress={()=> sendForm()}>
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
        color:'#000000',
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
