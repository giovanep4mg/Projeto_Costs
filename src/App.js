import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import Home from './componentes/pages/Home';
import Contact from './componentes/pages/Contact';
import Company from './componentes/pages/Company';
import NewProject from './componentes/pages/NewProject';

import NavBar from './componentes/NavBar/NavBar';

function App() {
    return (
        <Router>
            <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/contact'>Contato</Link>
            </li>
            <li>
                <Link to='/company'>Sobre</Link>
            </li>
            <li>
                <Link to='/newproject'>Novo Projeto</Link>
            </li>
        </ul>
            
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route  path='/company' element={<Company/>}/>
                <Route  path='/contact' element={<Contact/>}/>
                <Route  path='/newproject' element={<NewProject/>}/>
            </Routes>
        </Router>
  );
}

export default App;
