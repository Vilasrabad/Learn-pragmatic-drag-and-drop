import { useContext } from "react";
import TodoContext from "../context/TodoData";

export const useTodo = () => {
    return useContext(TodoContext);
};