import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar(){
    return(
        <ul className={styles.list}>
            <li className={styles.item}>
                <Link to='/'>Home</Link>
            </li>
            <li className={styles.item}>
                <Link to='/contact'>Contato</Link>
            </li>
            <li className={styles.item}>
                <Link to='/company'>Sobre</Link>
            </li>
            <li className={styles.item}>
                <Link to='/newproject'>Novo Projeto</Link>
            </li>
        </ul>
        
    )
}
export default NavBar;