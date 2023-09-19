import ProjectForm from '../../Project/ProjectForm/ProjectForm';
import styles from './NewProject.module.css';

function NewProject(){
    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto pra depois adicionar serviços.</p>
            <ProjectForm/>
        </div>
    )
}
export default NewProject;