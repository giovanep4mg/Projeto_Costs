import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <ul>
            <Link to="/">Home</Link>
            <Link to="/projects">Projetos</Link>
            <Link to="/company">Sobre</Link>
            <Link to="/contact">Contato</Link>
            <Link to="/newproject">Novo Projeto</Link>
            <Link to="/project">Projeto</Link>
        </ul>
    )
}
export default NavBar;