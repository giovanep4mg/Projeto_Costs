import Input from '../../Form/Input/Input';
import styles from './ProjectForm.module.css';
import Select from '../../Form/Select/Select'
import SubmitButton from '../../button/SubmitButton/SubmitButton';

function ProjectForm({btnText}){
    return(
        <form className={styles.form}>
            <Input 
                type='text' 
                text='Nome do projeto: ' 
                name='name' 
                placeholder='Insira o nome do projeto: ' 
                
            />
            <Input 
                type='number' 
                text='Orçamento do projeto: ' 
                name='budget' 
                placeholder='Insira o orçamento total: ' 
                
            />
            <Select
                name="categpry_id"
                text="Selecione a categoria"
            />
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ProjectForm;