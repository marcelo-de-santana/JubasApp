import { createContext, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import env from "../../env.json";
import d from "../services/api/barber.json";

const EmployeeContext = createContext({})

export default function EmployeeProvider({ children }) {
    const [barbersData, setBarbersData] = useState([]);
    const [indexButton, setIndexButton] = useState([]);
    const [week, setWeek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const [pagination, setPagination] = useState(0)
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${env.host}/barber/service-hour`)
            .then(response => response.json())
            .then(json => {
                setBarbersData(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [refresh])

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(`${env.host}/schedule/week`)
    //         .then(response => response.json())
    //         .then(json => {
    //             setWeek(json)
    //             setLoading(false)
    //         })
    // }, [])

    function refreshPage(){
        setLoading(true)
        setRefresh(refresh+1)
    }

    function changePage(routeName, index){
		setIndexButton(index)
		navigation.push(routeName)
    }

    function handlePagination(routeName){
        setLoading(true)
        navigation.navigate(routeName)
        setPagination(pagination+1)
    }

    return (
        <EmployeeContext.Provider value={{
            barbersData, week, pagination,
            indexButton, changePage,
            loading, setLoading, handlePagination,
            refreshPage,
        }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployee() {
    return useContext(EmployeeContext);
}
