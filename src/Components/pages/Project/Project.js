import styles from './Project.module.css';

import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import Loading from '../../Layout/Loading/Loading';
import Container from '../../Layout/Container/Container';
import ProjectForm from '../../Project/ProjectForm/ProjectForm';
import Message from '../../Layout/Message/Message';

function Project(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
        }, 300)

    }, [id])

    function editPost(project){
        //budget validation
        if(project.budget < project.cost){
            // mensagem
            setMessage("O orçamento não pode ser menor que o custo do projeto! ")
            setType('error')
            return(false)
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project), 
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            // mensagem
            setMessage("Projeto atualizado ")
            setType('sucess')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
        <>
            {project.name ?( 
                <div className={styles.project_details}>  
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}> 
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total de utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir edição"
                                            projectData={project}
                                        />
                                    </p>

                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            )
            : <Loading/>}
        </>
    )
}
export default Project;