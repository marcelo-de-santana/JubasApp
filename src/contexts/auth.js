import { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const navigation = useNavigation();

    function openSession(credentials) {
        setUser(credentials)
        navigation.navigate('Main')
    }

    return (
        <AuthContext.Provider value={{ user, openSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}