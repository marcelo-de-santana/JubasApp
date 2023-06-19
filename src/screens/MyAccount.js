import { useEffect, useState } from "react";
import { Alert, Keyboard, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/auth";
import { useFormik } from "formik";
import { updateMyAccountFormSchema } from "../utils/formSchema";
import env from "../../env.json";
import { global, placeHolderColorTextInput } from "../components/styles/global";
import mask from "../utils/mask";
import TextAlert from "../components/TextAlert";
import UnderConstruction from "../components/UnderConstruction";

export default function MyAccountMainScreen({ navigation }) {
    const { user } = useAuth()

    const formik = { handleChange, handleSubmit, values, errors } = useFormik({
        validationSchema: updateMyAccountFormSchema,
        initialValues: user,
        onSubmit: updateUserData
    });

    async function updateUserData(values) {
        const response = await fetch(`${env.host}/user/update/${values.CPF}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const json = await response.json()
        if (response.status == 401) {
            Alert.alert('', json.message)
        } else {
            Alert.alert('', json.message)
            navigation.navigate('Login')
        }
    }

    function handleTextInput(key, value) {
        handleChange(({ target: { name: [key], value: value } }))
    }

    return (
        <View style={global.container}>
            <ScrollView>
                <Pressable onPress={Keyboard.dismiss} style={global.horizontalMargins}>
                    <Text style={global.label}>CPF</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="decimal-pad"
                        placeholder="000.000.000-00"
                        placeholderTextColor={placeHolderColorTextInput}
                        maxLength={14}
                        value={values.CPF}
                        editable={false}
                    />

                    <Text style={global.label}>Nome Completo</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="Juba de Leão"
                        placeholderTextColor="#161c2660"
                        maxLength={50}
                        value={values.NAME}
                        onChangeText={text => handleTextInput('NAME', text)}
                    />
                    {errors.NAME && <TextAlert error={errors.NAME} />}

                    <Text style={global.label}>E-mail</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="email-address"
                        placeholder="jubasdeleao@exemplo.com"
                        placeholderTextColor="#161c2660"
                        maxLength={50}
                        value={values.EMAIL}
                        onChangeText={text => handleTextInput('EMAIL', text)}
                    />
                    {errors.EMAIL && <TextAlert error={errors.EMAIL} />}

                    <Text style={global.label}>Data de Nascimento</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="numeric"
                        placeholder="01/01/2001"
                        placeholderTextColor="#161c2660"
                        maxLength={10}
                        value={values.BIRTHDAY}
                        editable={false}
                    />

                    <Text style={global.label}>Telefone</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="number-pad"
                        placeholder="(61)99999-9999"
                        placeholderTextColor="#161c2660"
                        maxLength={14}
                        value={values.PHONE}
                        onChangeText={text => handleTextInput('PHONE', mask.phone(text))}
                    />

                    <Text style={global.label}>Senha</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="********"
                        placeholderTextColor="#161c2660"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={handleChange('PASSWORD')}
                    />
                    {errors.PASSWORD && <TextAlert error={errors.PASSWORD} />}

                    <Text style={global.label}>Confirmar Senha</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="********"
                        placeholderTextColor="#161c2660"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={handleChange('CHECKPASS')}
                    />
                    {errors.CHECKPASS && <TextAlert error={errors.CHECKPASS} />}
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={global.button} onPress={() => handleSubmit()}>
                            <Text style={global.textButton}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </ScrollView >
        </View >
    );
}