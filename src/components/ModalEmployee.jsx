import { useEmployee } from "../contexts/employee";
import { Alert, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { global, modal } from "./styles/global";
import mask from "../utils/mask";
import env from "../../env.json";

function ModalEmployee({ modalParams, setModalParams }) {
    const { refreshPage } = useEmployee();

    function closeModal() {
        setModalParams(prev => ({ ...prev, visible: false, data: '' }))
    }

    function handleTextInput(key, value) {
        setModalParams(prev => ({
            ...prev, data: {
                ...prev.data,
                [key]: value
            }
        }))
    }

    function alterBarber() {
        //MÉTODO RESPONSÁVEL POR ALTERAR O NOME DO BARBEIRO
        async function alterBarberName() {
            const response = await fetch(`${env.host}/barber/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modalParams.data)
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
        Alert.alert('', 'Deseja alterar o nome do barbeiro?', [{
            text: 'Cancelar',
            style: 'cancel',
        }, {
            text: 'Confirmar',
            onPress: () => alterBarberName()
        }])
    }

    function disableBarber() {
        //MÉTODO RESPONSÁVEL POR ALTERAR O ESTADO DO CADASTRO DO BARBEIRO
        async function disableBarberStatus() {
            const response = await fetch(`${env.host}/user/register-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    barber_id: modalParams.data.barberId,
                    status: Number(!modalParams.data.barberStatus)
                })
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
        Alert.alert('', `Deseja ${modalParams.data.barberStatus ? 'desativar' : 'ativar'} o barbeiro?`, [{
            text: 'Cancelar',
            style: 'cancel',
        },
        {
            text: 'Confirmar',
            onPress: () => disableBarberStatus()
        }
        ])
    }

    function deleteBarber() {
        async function sendDeleteBarber() {
            const response = await fetch(`${env.host}/barber/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modalParams.data)
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
        Alert.alert('', 'Deseja EXCLUIR o barbeiro, o cadastro ainda ficará disponível na lista de usuários?', [{
            text: 'Cancelar',
            style: 'cancel',
        },
        {
            text: 'Confirmar',
            onPress: () => sendDeleteBarber()
        }])
    }

    return (
        <Modal visible={modalParams.visible} animationType="fade" transparent={true} onRequestClose={() => closeModal()}>
            <View style={modal.container}>
                <Pressable style={modal.pressable} onPress={() => closeModal()} />
                <View style={modal.boxItems}>
                    <View style={modal.boxForm}>
                        <Text style={global.textHeader}>Nome</Text>
                        <TextInput style={modal.input}
                            value={modalParams.data.barberName}
                            onChangeText={text => handleTextInput('barberName', text)}
                        />
                        <TouchableOpacity onPress={() => alterBarber()}
                            style={modal.button}>
                            <Text style={modal.textButton}>Alterar Nome</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => disableBarber()}
                            style={modal.whiteButton}>
                            <Text style={modal.blackTextButton}>{modalParams.data.barberStatus ? 'Desativar' : 'Ativar'} barbeiro</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => deleteBarber()}
                        style={modal.redButton} >
                        <Text style={modal.textButton}>Remover permissão</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

function ModalRegisterEmployee({ modalParams, setModalParams }) {
    const { refreshPage } = useEmployee();

    function closeModal() {
        setModalParams(prev => ({ ...prev, visible: false, data: '' }))
    }

    function handleTextInput(key, value) {
        setModalParams(
            prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [key]: value
                }
            }))
    }

    function register() {
        //MÉTODO RESPONSÁVEL POR REGISTRAR UM NOVO BARBEIRO
        async function registerBarber() {
            const response = await fetch(`${env.host}/barber/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modalParams.data)
            })
            const json = await response.json()
            Alert.alert('', json.message)
            refreshPage()
            closeModal()
        }
        Alert.alert('', `Deseja cadastrar ${modalParams.data.barberName}?`, [{
            text: 'Cancelar',
            style: 'cancel'
        }, {
            text: 'Confirmar',
            onPress: () => registerBarber()
        }])
    }

    return (
        <Modal visible={modalParams.visible} animationType="fade" transparent={false}>
            <View style={modal.container}>
                <Pressable style={modal.pressable} onPress={() => closeModal()} />
                <View style={modal.boxItems}>
                    <View style={modal.boxForm}>
                        <Text style={global.textHeader}>CPF</Text>
                        <TextInput style={modal.input}
                            keyboardType="numeric"
                            maxLength={14}
                            value={modalParams.data.cpf}
                            onChangeText={text => handleTextInput('cpf', mask.cpf(text))}
                        />
                        <Text style={global.textHeader}>Nome</Text>
                        <TextInput style={modal.input}
                            value={modalParams.data.name}
                            onChangeText={text => handleTextInput('name', mask.name(text))}
                        />
                        <Text style={global.textHeader}>Senha</Text>
                        <TextInput style={modal.input}
                            secureTextEntry={true}
                            maxLength={20}
                            value={modalParams.data.password}
                            onChangeText={text => handleTextInput('password', text)}
                        />
                        <TouchableOpacity onPress={() => register()}
                            style={modal.button}>
                            <Text style={modal.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export { ModalEmployee, ModalRegisterEmployee }