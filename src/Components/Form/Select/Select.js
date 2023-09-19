import styles from './Select.module.css';

function Select({ text, name, options, handleOnChange, value}){
    return(
        <div className={styles.form_control} >
            <label htmlFor={name}> {text}: </label>
            <Select name={name} id={name}>
                <option> Selecione uma opção: </option>
            </Select>
        </div>
    )
}
export default Select;