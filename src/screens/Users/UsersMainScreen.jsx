import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { global, modal } from "../../components/styles/global";
import env from "../../../env.json";
import UsersList from "./UsersList";
import ModalUser from "./ModalUser";
import LoadingScreen from "../../components/LoadingScreen";
import UnderConstruction from "../../components/UnderConstruction";

export default function UsersMainScreen({ navigation }) {
    try {
        const [usersData, setUsersData] = useState([]);
        const [modalParams, setModalParams] = useState({});
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            fetch(`${env.host}/user`)
                .then(response => response.json())
                .then(json => {
                    setUsersData(json)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }, [])

        function openModal(users) {
            setModalParams(prev => ({
                ...prev,
                visible: true,
                data: users
            }))
        }

        if (loading) {
            return <LoadingScreen />
        }

        return (
            <View style={global.container}>
                <ModalUser modalParams={modalParams} setModalParams={setModalParams} />
                <ScrollView>
                    <Text style={global.textHeader}>Usuários</Text>
                    {usersData.map((item, index, array) => (
                        <UsersList key={item.user_id} data={array[index]} openModal={openModal} />
                    ))}
                </ScrollView>
            </View>
        );
    } catch (error) {
        return console.log(error)
    }
}