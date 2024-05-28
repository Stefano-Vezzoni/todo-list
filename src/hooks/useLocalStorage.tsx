import { TodoObject } from "../components/Content";

const localKey = "@TodoList-Ignite";

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem(localKey) || "{}");
}

export function setLocalStorage(data: { todoList: TodoObject[] }) {
    const existingData = getLocalStorage();

    const formattedData = {
        ...(existingData || {}),
        ...data
    }

    localStorage.setItem(localKey, JSON.stringify(formattedData))
}