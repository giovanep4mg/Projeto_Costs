import styles from './Project.module.css';

import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import Loading from '../../Layout/Loading/Loading';
import Container from '../../Layout/Container/Container';
import ProjectForm from '../../Project/ProjectForm/ProjectForm';
import Message from '../../Layout/Message/Message';
import ServiceForm from '../../Service/ServiceForm';
import {parse, v4 as uuidv4 } from 'uuid';

function Project(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        // setTimeout é o loanding carregamento
        setTimeout(() => { 
            // aqui vai buscar e carregar o projeto se tiver
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
        setMessage('')

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
            setMessage("Projeto atualizado! ")
            setType('sucess')
        })
        .catch(err => console.log(err))
    }

    function createService(project){
        // pata atualizar as mensagens
        setMessage('')

        //last service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço!")
            setType('error')
            project.services.pop()
            return false
        }
        
        // atualiza o cost do banco de dados
        project.cost = newCost

        // atualizando o projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project), 
        })
        .then(resp => resp.json())
        .then((data) => {
            // exibir os serviços
            console.log(data)
           // setProject(data)
            //setShowProjectForm(false)
            // mensagem
            //setMessage("Projeto atualizado! ")
            //setType('sucess')
        })
        .catch(err => console.log(err))


        // update project
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            // exibir os serviços
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
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
                                {/** Se tiver projeto vai exibir editar projeto, se não exibi fechar projeto*/}
                                {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
                            </button>
                            {/**Se estiver projeto, vai exibir tudo que está aqui dentro */}
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
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <div>
                                        <ServiceForm
                                            handleSubmit={createService}
                                            textBtn="Adicionar Serviço"
                                            projectData={project}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviços</p>
                        </Container>
                    </Container>
                </div>
            )
            : <Loading/>}
        </>
    )
}
export default Project;