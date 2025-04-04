import { createContext, useContext, useState } from "react";
import { getInitialData } from "../components/peoples/data/people";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(getInitialData());

    return <DataContext.Provider value={{ data, setData }}>
        {children}
    </DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}