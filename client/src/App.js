import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Task from './pages/Task';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
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
