import { createContext, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import env from "../../env.json";
import d from "../services/api/barber.json";

const EmployeeContext = createContext({})

export default function EmployeeProvider({ children }) {
    const [data, setData] = useState([]);
    const [week, setWeek] = useState([]);
    const [indexButton, setIndexButton] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(0)
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${env.host}/barber/service-hour`)
            .then(response => response.json())
            .then(json => {
                setData(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [pagination])

    useEffect(() => {
        setLoading(true)
        fetch(`${env.host}/schedule/week`)
            .then(response => response.json())
            .then(json => {
                setWeek(json)
                setLoading(false)
            })
    }, [])

	function handleBarberTimes(index){
		setIndexButton(index)
		navigation.push('EmployeeOverview')
	}

    function handlePagination(routeName){
        setLoading(true)
        navigation.navigate(routeName)
        setPagination(pagination+1)
    }

    return (
        <EmployeeContext.Provider value={{
            data, week, pagination, 
            indexButton, handleBarberTimes,
            loading, setLoading, handlePagination,
        }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployee() {
    return useContext(EmployeeContext);
}
