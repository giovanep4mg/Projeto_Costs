import Message from "../../Layout/Message/Message";

import { useLocation} from 'react-router-dom';

function Projects(){
    
    const location = useLocation()

    const message = new URLSearchParams(location.search).get('message');


    console.log("mensagem "+message)
    
    return(
        <div>
            <h1>Meus projetos!</h1>
            {message && <Message type="sucess" msg={message}/> }
        </div>
    )
}
export default Projects;