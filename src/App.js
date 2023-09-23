import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Components/pages/Home/Home';
import Contact from './Components/pages/Contact/Contact';
import Company from './Components/pages/Company/Company';
import NewProject from './Components/pages/NewProject/NewProject';
import Projects from './Components/pages/Projects/Projects';
import Project from './Components/pages/Project/Project';

import NavBar from './Components/Layout/NavBar/NavBar';

import Container from './Components/Layout/Container/Container';

import Footer from './Components/Layout/Footer/Footer';

function App() {
  return (
        <Router>
            <NavBar/>
            <Container customClass='min_height'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/company' element={<Company/>}/>
                    <Route path='/newproject' element={<NewProject/>}/>
                    <Route path='/projects' element={<Projects/>} />
                    <Route path='/project/:id' element={<Project/>} />
                </Routes> 
            </Container>
            <Footer/>
        </Router>
  );
}

export default App;
