import { Alert, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { global, modal, placeHolderColorTextInput } from "../../components/styles/global";
import env from "../../../env.json";
import mask from "../../utils/mask";

export default function ModalUser({ modalParams, setModalParams, refreshPage }) {
    const { visible, data } = modalParams;

    function closeModal() {
        setModalParams(prev => ({
            ...prev,
            visible: false,
            data: ''
        }))
    }

    function handleTextInput(setUseState, key, value) {
        setUseState(prev => ({
            ...prev, data:
            {
                ...prev.data,
                [key]: value
            }
        }))
    }

    function handleAcessLevelScreen(visible, userLevel) {
        setModalParams(prev => ({
            ...prev,
            accessLevelParams: {
                visible: visible,
                userLevel: userLevel
            }
        }))
    }

    function updateUser() {
        Alert.alert('', `Deseja gravar o registro?`, [{
            text: 'Cancelar',
            style: 'cancel'
        }, {
            text: 'Confirmar',
            onPress: () => sendUpdateUser()
        }])
        async function sendUpdateUser() {
            const response = await fetch(`${env.host}/user/update`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(modalParams.data)
            })
            const json = await response.json()
            Alert.alert('', json.message)
            closeModal()
            refreshPage()
        }
    }

    function removeUser() {
        Alert.alert('', 'Deseja excluir o usuário?', [{
            text: 'Cancelar',
            style: "cancel"
        }, {
            text: 'Confirmar',
            onPress: () => sendRemoveUser()
        }])
        async function sendRemoveUser() {
            const response = await fetch(`${env.host}/user/delete`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            Alert.alert('',json.message)
            closeModal()
            refreshPage()
        }
    }

    return (
        <Modal visible={visible === true} transparent={true}>
            <AcessLevelBox modalParams={modalParams} handleAcessLevelScreen={handleAcessLevelScreen} refreshPage={refreshPage} />
            <View style={modal.container}>
                <Pressable style={modal.pressable} onPress={() => closeModal()} />
                <View style={modal.boxItems}>
                    <View style={modal.boxForm}>
                        <Text style={modal.textHeader}>CPF</Text>
                        <TextInput style={modal.input}
                            keyboardType="decimal-pad"
                            maxLength={14}
                            placeholderTextColor={placeHolderColorTextInput}
                            placeholder="000.000.000-00"
                            value={data?.cpf}
                            onChangeText={text => handleTextInput(setModalParams, 'cpf', mask.cpf(text))}
                        />
                        <Text style={modal.textHeader}>Nome</Text>
                        <TextInput style={modal.input}
                            keyboardType="default"
                            maxLength={50}
                            placeholderTextColor={placeHolderColorTextInput}
                            placeholder="Juba de Leão"
                            value={data?.name}
                            onChangeText={text => handleTextInput(setModalParams, 'name', mask.name(text))}
                        />
                        <Text style={modal.textHeader}>E-mail</Text>
                        <TextInput style={modal.input}
                            keyboardType="email-address"
                            maxLength={50}
                            placeholderTextColor={placeHolderColorTextInput}
                            placeholder="jubasdeleao@exemplo.com"
                            value={data?.email}
                            onChangeText={text => handleTextInput(setModalParams, 'email', (text))}
                        />
                        <Text style={modal.textHeader}>Aniversário</Text>
                        <TextInput style={modal.input}
                            keyboardType="numeric"
                            maxLength={10}
                            placeholderTextColor={placeHolderColorTextInput}
                            placeholder="01/01/2001"
                            value={data?.birthday}
                            onChangeText={text => handleTextInput(setModalParams, 'birthday', mask.date(text))}
                        />
                        <Text style={modal.textHeader}>Telefone</Text>
                        <TextInput style={modal.input}
                            keyboardType="number-pad"
                            maxLength={14}
                            placeholderTextColor={placeHolderColorTextInput}
                            placeholder="(61)99999-9999"
                            value={data?.phone}
                            onChangeText={text => handleTextInput(setModalParams, 'phone', mask.phone(text))}
                        />
                        <View style={modal.switchBox}>
                            <Text style={modal.textHeader}>Status</Text>
                            <Switch
                                value={Boolean(data?.status_registration)}
                                onValueChange={value => (handleTextInput(setModalParams, 'status_registration', value))}
                            />
                        </View>
                        <TouchableOpacity style={modal.button} onPress={() => updateUser()}>
                            <Text style={modal.textButton}>Alterar usuário</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={modal.whiteButton} onPress={() => handleAcessLevelScreen(true, data?.level)}>
                        <Text style={modal.blackTextButton}>Gerenciar nível de acesso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={modal.redButton} onPress={() => removeUser()}>
                        <Text style={modal.textButton}>Excluir usuário</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

function AcessLevelBox({ modalParams, handleAcessLevelScreen, refreshPage }) {
    const [systemLevelData, setSystemLevelData] = useState([]);
    const { user_id } = modalParams?.data;
    const { visible, userLevel } = modalParams.accessLevelParams ?? '';

    useEffect(() => {
        fetch(`${env.host}/user/access-level`)
            .then(response => response.json())
            .then(json => setSystemLevelData(json))
            .catch(err => console.log(err))
    }, [])

    function alterAccessLevel(newUserLevel) {
        Alert.alert('', 'Deseja alterar o nível de acesso do usuário?', [{
            text: 'Cancelar',
            style: 'cancel'
        }, {
            text: 'Confirmar',
            onPress: () => sendAlterAccessLevel()
        }])
        async function sendAlterAccessLevel() {
            const response = await fetch(`${env.host}/user/access-level`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user_id,
                    userLevel: newUserLevel
                })
            })
            const json = await response.json()
            Alert.alert('', json.message)
            handleAcessLevelScreen(false)
            refreshPage()
        }

    }
    return (
        <Modal visible={visible == true} transparent={true}>
            <View style={modal.container}>
                <View style={modal.boxItems}>
                    <View style={modal.boxForm}>
                        <Text style={modal.textHeader}>Nível de acesso</Text>
                        {systemLevelData.map((item) => {
                            const buttonStyle = item.level == userLevel ? [modal.redButton, modal.textButton] : [modal.whiteButton, modal.blackTextButton];
                            const disableButton = item.level === userLevel;
                            return (
                                <TouchableOpacity onPress={() => alterAccessLevel(item.level)}
                                    key={item.level} style={buttonStyle[0]}
                                    disabled={disableButton}
                                >
                                    <Text style={buttonStyle[1]}>{item.description}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <Pressable style={modal.pressable} onPress={() => handleAcessLevelScreen(false)} />
            </View>
        </Modal>
    );
}
