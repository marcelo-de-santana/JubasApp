import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global, modal } from "../../components/styles/global";
import LoadingScreen from "../../components/LoadingScreen";
import env from "../../../env.json";

export default function ScheduleManagementMainScreen() {
    const [pageData, setpageData] = useState({
        loading: true,
    });
    const [modaParams, setModalParams] = useState({})

    useEffect(() => {
        fetch(`${env.host}/schedule/management`)
            .then(response => response.json())
            .then(json => setpageData(prev =>({
                ...prev,
                loading: false, data: json
            })))
            .catch(err => console.log(err))
    }, [pageData?.refresh])



    function refreshPage(){
        setpageData(prev =>({
            ...prev,
            loading: true,
            refresh: {
                ...prev?.refresh + 1
            }
        }))
    }

    function openModal(serviceParams) {
        setModalParams({
            visible: true,
            data: serviceParams
        })
    }

    function ModalScheduleManagement({modaParams, setModalParams, refreshPage}) {
        const {data} = modaParams;

        function closeModal() {
            setModalParams({ visible: false })
        }

        function removeSchedule(){
            Alert.alert('','Deseja remover o agendamento?',[{
                text: 'Cancelar',
                style: 'cancel'
            },{
                text: 'Confirmar',
                onPress: () => sendRemoveSchedule()
            }])
            async function sendRemoveSchedule(){
                const response = await fetch(`${env.host}/schedule/management`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
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
            <Modal visible={modaParams?.visible == true}>
                <View style={modal.container}>
                    <Pressable style={modal.pressable} onPress={() => closeModal()} />
                    <View style={modal.boxItems}>
                        <TouchableOpacity style={modal.redButton} onPress={() => removeSchedule()}>
                            <Text style={modal.textButton}>Excluir agendamento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    if (pageData.loading) return <LoadingScreen />
    return (
        <View style={global.container}>
            <ModalScheduleManagement modaParams={modaParams} setModalParams={setModalParams} refreshPage={refreshPage} />
            <ScrollView>
                {pageData.data?.map(item => (
                    <View key={item.date}>
                        <Text style={global.textHeader}>Dia: {item.date}</Text>
                        <View style={global.blueBoxItems}>
                            {item?.schedules.map(scheduleParams => {
                                const {
                                    schedule_id, client_name, barber_name,
                                    name_service, weekday_name, time, status
                                } = scheduleParams
                                return (
                                    <View key={schedule_id} >
                                        <View style={global.boxFlexRow}>
                                            <Text style={global.whiteTextSmall}>{barber_name}</Text>
                                            <TouchableOpacity onPress={() => openModal(scheduleParams)}>
                                                <Text style={global.whiteTextSmall}>Editar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={global.greyBoxItems}>
                                            <Text style={global.darkBlueTextSmall}>Cliente: {client_name}</Text>
                                            <Text style={global.darkBlueTextSmall}>Serviço: {name_service}</Text>
                                            <Text style={global.darkBlueTextSmall}>Horário: {time}</Text>
                                            <Text style={global.darkBlueTextSmall}>Dia da semana: {weekday_name}</Text>
                                            <Text style={global.darkBlueTextSmall}>Status: {status}</Text>
                                        </View>
                                    </View>
                                );
                            }
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}