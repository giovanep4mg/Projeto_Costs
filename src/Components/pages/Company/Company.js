import styles from './Company.module.css';


function Company(){
    return(
        <div className={styles.company_tudo}>
            <div>
                <h1>
                    Projeto criado assistindo ao Curso de React
                </h1>
            </div>
            <div>
                <h2>
                    Curso de React, do canal <span>Matheus</span> <span>Battisti</span>.
                </h2>
            </div>
            <div>
                <p>
                    <a href="https://youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&si=aGOQI2TcQAGR1_KQ">
                        Link da playlist
                    </a>
                </p>
            </div>
        </div>
        
        
    )
}
export default Company;