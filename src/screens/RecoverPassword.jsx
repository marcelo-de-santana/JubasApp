import {Alert, Keyboard, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextAlert from "../components/TextAlert";
import { useFormik } from "formik";
import { recoverPassSchema } from "../utils/formSchema";
import { global } from "../components/styles/global";
import mask from "../utils/mask";
import env from "../../env.json";

export default function RecoverPassword({navigation}) {
    const { handleChange, handleSubmit, values, errors } = useFormik({
        validationSchema: recoverPassSchema,
        initialValues: {
            cpf: '',
            password: '',
            checkPass: ''
        },
        onSubmit: () => sendData()
    });

    async function sendData() {
        const response = await fetch(`${env.host}/user/recover-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const json = await response.json();
        if (response.status == 200) {
            navigation.navigate('Login')
            Alert.alert('', json.message)
        } else {
            Alert.alert('', json.message)
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
                        placeholderTextColor="#161c2660"
                        maxLength={14}
                        value={mask.cpf(values.cpf)}
                        onChangeText={text => handleTextInput('cpf', mask.cpf(text))}
                    />
                    {errors.cpf && <TextAlert error={errors.cpf} />}

                    <Text style={global.label}>Nova senha</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="********"
                        placeholderTextColor="#161c2660"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                    />
                    {errors.password && <TextAlert error={errors.password} />}

                    <Text style={global.label}>Confirmar Senha</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="********"
                        placeholderTextColor="#161c2660"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={handleChange('checkPass')}
                    />
                    {errors.checkPass && <TextAlert error={errors.checkPass} />}
                </Pressable>
            </ScrollView>
            <TouchableOpacity style={global.button} onPress={() => handleSubmit()}>
                <Text style={global.textButton}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}