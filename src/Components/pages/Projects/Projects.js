import Message from "../../Layout/Message/Message";

import styles from './Projects.module.css';

import Container from '../../Layout/Container/Container';

import { useLocation} from 'react-router-dom';

import LinkButton from '../../Layout/LinkButton/LinkButton';
import ProjectCard from "../../Project/ProjectCard/ProjectCar";
import { useState, useEffect } from "react";

function Projects(){

    const [projects, setProjects ] = useState([]);
    
    const location = useLocation()

    useEffect(() => {

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
        })
        .catch((err) => console.log(err))
    }, [])

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
                {projects.length > 0 && 
                    projects.map((project) => <ProjectCard 
                    id={project.id}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    name={project.name}/> )}
            </Container>
        </div>
    )
}
export default Projects;