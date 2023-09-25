import Message from "../../Layout/Message/Message";

import styles from './Projects.module.css';

import Container from '../../Layout/Container/Container';

import { useLocation} from 'react-router-dom';

import LinkButton from '../../Layout/LinkButton/LinkButton';

function Projects(){
    
    const location = useLocation()

    const message = new URLSearchParams(location.search).get('message');


    console.log("mensagem "+message)
    
    return(
        <div className={styles.projects_container} >
            <div className={styles.title_container} >
                <h1>Meus projetos!</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="sucess" msg={message}/> }
            <Container customClass="start">
                <p>projetos</p>
            </Container>
        </div>
    )
}
export default Projects;