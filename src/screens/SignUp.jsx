import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFormik } from "formik";
import { registerFormSchema } from "../utils/formSchema";
import { global } from "../components/styles/global";
import TextAlert from "../components/TextAlert";
import mask from "../utils/mask";
import env from "../../env.json";

export default function SingUp({ navigation }) {
    const { handleChange, handleSubmit, values, errors } = useFormik({
        validationSchema: registerFormSchema,
        initialValues: {
            cpf: '',
            name: '',
            email: '',
            birthday: '',
            phoneNumber: '',
            password: '',
            checkPass: ''
        },
        onSubmit: registerUser
    });

    async function registerUser(values) {
        const response = await fetch(`${env.host}/user/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const json = await response.json();
        if (response.status == 201) {
            navigation.navigate('Login')
            Alert.alert('',json.message)
        } else {
            Alert.alert('',json.message)
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
                        value={values.cpf}
                        onChangeText={text => handleTextInput('cpf', mask.cpf(text))}
                    />
                    {errors.cpf && <TextAlert error={errors.cpf} />}

                    <Text style={global.label}>Nome Completo</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="default"
                        placeholder="Juba de Leão"
                        placeholderTextColor="#161c2660"
                        maxLength={50}
                        value={values.name}
                        onChangeText={text => handleTextInput('name', text)}
                    />
                    {errors.name && <TextAlert error={errors.name} />}

                    <Text style={global.label}>E-mail</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="email-address"
                        placeholder="jubasdeleao@exemplo.com"
                        placeholderTextColor="#161c2660"
                        maxLength={50}
                        onChangeText={text => handleTextInput('email', text)}
                    />
                    {errors.email && <TextAlert error={errors.email} />}

                    <Text style={global.label}>Data de Nascimento</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="numeric"
                        placeholder="01/01/2001"
                        placeholderTextColor="#161c2660"
                        maxLength={10}
                        value={values.birthday}
                        onChangeText={text => handleTextInput('birthday', mask.date(text))}
                    />
                    {errors.birthday && <TextAlert error={errors.birthday} />}

                    <Text style={global.label}>Telefone</Text>
                    <TextInput
                        style={global.input}
                        keyboardType="number-pad"
                        placeholder="(61)99999-9999"
                        placeholderTextColor="#161c2660"
                        maxLength={14}
                        value={values.phoneNumber}
                        onChangeText={text => handleTextInput('phoneNumber', mask.phone(text))}
                    />
                    {errors.phoneNumber && <TextAlert error={errors.phoneNumber} />}

                    <Text style={global.label}>Senha</Text>
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