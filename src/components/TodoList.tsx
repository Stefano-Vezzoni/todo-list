import styles from "./TodoList.module.css";
import { Check, Trash } from "phosphor-react"

export interface TodoListProps {
    handleOnClick: (content: string) => void;
    isChecked?: boolean;
    content: string;
    onDeleteTodo: (content: string) => void;
}

export function TodoList({ content, onDeleteTodo, isChecked, handleOnClick }: TodoListProps) {

    function handleDeleteTodo() {
        onDeleteTodo(content);
    }

    function handleOnClickTodo() {
        handleOnClick(content);
    }

    return (
        <span className={styles.todo}>
            <span>
                <button className={isChecked ? styles.isChecked : styles.isNotChecked} onClick={handleOnClickTodo}>
                    {isChecked && <Check />}
                </button>
            </span>
            <p className={isChecked ? styles.withLineThrough : ""}>{content}</p>
            <button className={styles.trashButton} onClick={handleDeleteTodo}>
                <Trash />
            </button>
        </span>
    )
}