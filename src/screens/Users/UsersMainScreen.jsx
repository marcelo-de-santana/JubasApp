import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { global } from "../../components/styles/global";
import env from "../../../env.json";
import UsersList from "./UsersList";
import ModalUser from "./ModalUser";
import LoadingScreen from "../../components/LoadingScreen";

export default function UsersMainScreen({ navigation }) {
    const [usersData, setUsersData] = useState([]);
    const [modalParams, setModalParams] = useState({});
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        fetch(`${env.host}/user`)
            .then(response => response.json())
            .then(json => {
                setUsersData(json)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [refresh])

    function refreshPage() {
        setLoading(true)
        setRefresh(refresh + 1)
    }

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
            <ModalUser modalParams={modalParams} setModalParams={setModalParams} refreshPage={refreshPage} />
            <ScrollView>
                <Text style={global.textHeader}>Usuários</Text>
                {usersData.map((item, index, array) => (
                    <UsersList key={item.user_id} data={array[index]} openModal={openModal} />
                ))}
            </ScrollView>
        </View>
    );
}