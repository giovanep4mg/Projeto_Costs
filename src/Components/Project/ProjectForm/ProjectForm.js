import Input from '../../Form/Input/Input';
import styles from './ProjectForm.module.css';
import Select from '../../Form/Select/Select'
import SubmitButton from '../../button/SubmitButton/SubmitButton';
import {useState, useEffect} from 'react';

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject ] = useState(projectData || {} )

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method:"GET",
        headers: {
            "content-type": "application/json"
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .then().catch( (err) => console.log(err) )
    },[])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project,[e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        const selectedOption = e.target.options[e.target.selectedIndex];
    
        if (selectedOption) {
            setProject({
                ...project, 
                category: {
                    id: e.target.value,
                    name: selectedOption.text,
                },
             });
        }
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type='text' 
                text='Nome do projeto: ' 
                name='name' 
                placeholder='Insira o nome do projeto: ' 
                handleOnChange={handleChange}  
                value={project.name ? project.name :''}
            />
            <Input 
                type='number' 
                text='Orçamento do projeto: ' 
                name='budget' 
                placeholder='Insira o orçamento total: ' 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}  
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}  
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ProjectForm;