import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { global, modal } from "./styles/global";
import env from "../../env.json";
import LoadingScreen from "../components/LoadingScreen";
import d from "../services/api/barberWeek.json";

export function WeekDaysForm({statusButton, setStatusButton}) {
    const [weekDays, setWeekDays] = useState([])

    useEffect(() => {
        fetch(`${env.host}/schedule/week`)
            .then(response => response.json())
            .then(json => setWeekDays(json))
            .catch(err => console.log(err))
    }, [])

    function handleSwitchButton(index, value) {
        setStatusButton(prev => ({[index]: value}));
    }

    return (
        <View style={modal.boxItems}>
            <View style={modal.boxForm}>
                {weekDays.length === 0 && <LoadingScreen />}
                {weekDays.map((item, index) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} key={index}>
                        <Text style={global.darkBlueTextSmall}>{item.day}</Text>
                        <Switch value={statusButton?.[item.id]} onValueChange={value => handleSwitchButton(item.id, value)} />
                    </View>
                ))}
            </View>
        </View>
    );
}
