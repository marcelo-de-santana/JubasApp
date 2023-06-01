import { createContext, useContext, useEffect, useState } from "react";
import env from "../../env.json";

const CatalogContext = createContext();

export default function CatalogProvider({ children }) {
    const [specialties, setSpecialties] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(null);

    useEffect(() => {
        fetch(`${env.host}/schedule/specialties`)
            .then(response => response.json())
            .then(json => setSpecialties(json))
            .catch(error => console.log(error))
    }, [])

    return (
        <CatalogContext.Provider value={{ specialties, categoryIndex, setCategoryIndex }}>
            {children}
        </CatalogContext.Provider>
    );
}

export function useCatalog(){
    return useContext(CatalogContext);
} 