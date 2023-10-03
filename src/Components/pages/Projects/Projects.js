import Message from "../../Layout/Message/Message";

import styles from './Projects.module.css';

import Container from '../../Layout/Container/Container';
import Loading from "../../Layout/Loading/Loading";
import { useLocation} from 'react-router-dom';

import LinkButton from '../../Layout/LinkButton/LinkButton';
import ProjectCard from "../../Project/ProjectCard/ProjectCar";
import { useState, useEffect } from "react";

function Projects(){

    const [projects, setProjects ] = useState([]);
    const location = useLocation()
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {

        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
        }, 300)
    }, [])

    const message = new URLSearchParams(location.search).get('message');


    console.log("mensagem "+message)

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers : {
                'Content-Type' : 'application/json'
            },
        })
        .then(resp => resp.json()) 
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id ))
            setProjectMessage("Projeto removido com sucesso! ")
        })
        .catch(err => console.log(err))
    }
    
    return(
        <div className={styles.projects_container} >
            <div className={styles.title_container} >
                <h1>Meus projetos!</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="sucess" msg={message}/> }
            {projectMessage && <Message type="sucess" msg={projectMessage}/> }
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => 
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        /> 
                    )}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}
export default Projects;