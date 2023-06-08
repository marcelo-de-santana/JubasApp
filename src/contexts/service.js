import { createContext, useContext, useState, useEffect } from "react";
const ServiceContext = createContext()

export default function ServiceProvider({ children }) {
    const [serviceData, setServiceData] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])
    const [switchState, setSwitchState] = useState({})

    return (
        <ServiceContext.Provider value={{
            serviceData, setServiceData,
            shoppingCart, setShoppingCart,
            switchState, setSwitchState,
        }}>
            {children}
        </ServiceContext.Provider>
    );
}

export function useService() {
    return useContext(ServiceContext);
}
