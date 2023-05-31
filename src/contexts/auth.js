import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const navigation = useNavigation();

    function openSession(cpf, userLevel) {
        setUser({
            CPF: cpf,
            LEVEL: userLevel
        })
        navigation.navigate('Schedule')
    }

    return (
        <AuthContext.Provider value={{ user, openSession }}>
            {children}
        </AuthContext.Provider>
    );
}