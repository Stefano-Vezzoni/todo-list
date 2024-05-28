import styles from './Header.module.css';
import emptyTodoListLogo from "../assets/logo-icon.svg";

export function Header() {
    return (
        <header className={styles.header}>
            <img src={emptyTodoListLogo} alt="to do list logo" />
        </header>
    );
}