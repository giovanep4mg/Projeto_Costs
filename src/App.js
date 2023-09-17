import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Components/pages/Home';
import Contact from './Components/pages/Contact';
import Company from './Components/pages/Company';
import NewProject from './Components/pages/NewProject';
import Projects from './Components/pages/Projects';
import Project from './Components/pages/Project';

import NavBar from './Components/NavBar/NavBar';

import Container from './Components/Layout/Container';

function App() {
    return (
        <Router>
            <NavBar/>
            <Container customClass="min-height">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/projects' element={<Projects/>}/>
                <Route path='/company' element={<Company/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/newproject' element={<NewProject/>}/>
                <Route path='/project/:id' element={<Project/>}/>
            </Routes>

            </Container>
            <footer>Footer</footer>
        </Router>
    );
}

export default App;
