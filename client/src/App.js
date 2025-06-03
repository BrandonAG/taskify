import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Task from './pages/Task';
import Navigation from './components/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/project/:id' element={<Project />}/>
          <Route exact path='/task' element={<Task />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
