import { createContext, useContext, useEffect, useState } from "react";
import env from "../../env.json";

const CatalogContext = createContext();

export default function CatalogProvider({ children }) {
    const [specialties, setSpecialties] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(null);
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        fetch(`${env.host}/schedule/specialties`)
            .then(response => response.json())
            .then(json => setSpecialties(json))
            .catch(error => console.log(error))
    }, [refresh])

    function refreshPage(){
        setRefresh(refresh+1)
    }

    return (
        <CatalogContext.Provider value={{ specialties, categoryIndex, setCategoryIndex, refreshPage }}>
            {children}
        </CatalogContext.Provider>
    );
}

export function useCatalog(){
    return useContext(CatalogContext);
} 
