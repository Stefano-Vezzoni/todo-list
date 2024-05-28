import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import listIcon from "../assets/list-icon.svg";
import plusIcon from "../assets/plus-icon.svg";
import { getLocalStorage, setLocalStorage } from "../hooks/useLocalStorage";
import styles from "./Content.module.css";
import { TodoList } from "./TodoList";

export interface TodoObject {
    content: string;
    isChecked: boolean;
}

export function Content() {

    const [todoList, setTodoList] = useState<TodoObject[]>([]);

    const [newTodoContent, SetNewTodoContent] = useState("");

    const isNewTodoEmpty = newTodoContent.length === 0;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(
        () => {
            if (!isLoaded) {
                const existingData = getLocalStorage();

                if (existingData?.todoList?.length) {
                    setTodoList(existingData.todoList)
                }
                setIsLoaded(true);
            } else {
                setLocalStorage({ todoList: todoList });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [todoList]
    )

    function handleCreateNewTodo(event: FormEvent) {
        event.preventDefault()

        setTodoList([...todoList, { content: newTodoContent, isChecked: false }]);
        SetNewTodoContent("");
    }

    function handleTodoListInputChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");
        SetNewTodoContent(event.target.value)
    }

    function deleteTodo(todoToDelete: string) {
        const todoListWithoutDeletedOne = todoList.filter(todo => {
            return todo.content !== todoToDelete;
        })
        setTodoList(todoListWithoutDeletedOne);
    }

    function handleOnClick(content: string) {
        const updatedTodoList = todoList.map(todo => {
            if (todo.content === content) {
                return { ...todo, isChecked: !todo.isChecked };
            }
            return todo;
        });
        setTodoList(updatedTodoList);
    }

    function tasksDone() {
        if (todoList.length === 0) {
            return 0;
        }

        const checkedCount = todoList.reduce((acc, todo) => {
            if (todo.isChecked) {
                acc++;
            }
            return acc;
        }, 0)

        return `${checkedCount} de ${todoList.length}`;
    }

    return (
        <div className={styles.content}>
            <form className={styles.contentForm} onSubmit={handleCreateNewTodo}>
                <input
                    value={newTodoContent}
                    onChange={handleTodoListInputChange}
                    type="text"
                    placeholder="Adicione uma nova tarefa" />

                <button type="submit" disabled={isNewTodoEmpty}>
                    Criar
                    <img src={plusIcon} />
                </button>
            </form>

            <div className={styles.contentBody}>
                <div className={styles.taskCountBar}>
                    <span className={styles.taskCreatedCount}>
                        Tarefas criadas
                        <span>{todoList.length}</span>
                    </span>

                    <span className={styles.taskDoneCount}>
                        Concluídas
                        <span>
                            {tasksDone()}
                        </span>
                    </span>
                </div>

                {todoList.length === 0 ?
                    <div className={styles.emptyTodoList}>
                        <img src={listIcon} alt="Ícone de lista" />
                        <span>
                            <p>
                                <strong>Você ainda não tem tarefas cadastradas</strong>
                                <br />
                                Crie tarefas e organize seus itens a fazer
                            </p>
                        </span>
                    </div>
                    :
                    <div className={styles.todoList}>
                        {todoList.map(todo => {
                            return (
                                <TodoList
                                    key={todo.content}
                                    content={todo.content}
                                    onDeleteTodo={deleteTodo}
                                    handleOnClick={handleOnClick}
                                    isChecked={todo.isChecked}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
}