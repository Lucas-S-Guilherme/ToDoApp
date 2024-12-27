import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ToDoContext = createContext();

export const ToDoProvider = ({children}) => {
    const [tarefas, setTarefas] = useState([]);
    useEffect(() => {
        (async() => {
            const jsonValue = await AsyncStorage.getItem('@tarefas');
            if (jsonValue) setTarefas(JSON.parse(jsonValue));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('@tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = (texto) => {
        const novaTarefa = { id: Date.now(), texto, concluida: false};
        setTarefas((antigas) => [...antigas, novaTarefa]);
    };

    const alternarConclusao = (id) => {
        setTarefas((antigas) =>
            antigas.map((t) => t.id === id ? {...t, concluida:!t.concluida} : t)
        );
    };

    removerTarefa = (id) => {
        setTarefas((antigas) => antigas.filter((t) => t. id !== id));
    };

    return (
        <ToDoContext.Provider value={{tarefas, adicionarTarefa, alternarConclusao, removerTarefa}}>
            {children}
        </ToDoContext.Provider>
    );    

};


