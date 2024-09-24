import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/home';
import MyFlights from './pages/MyFlights/myFlights';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/'  element = {<Navigate to = '/home'/>} />
        <Route  path= '/home' element= {<Home/>}  />
        <Route  path= '/my-flights' element= {<MyFlights/>}  />
      </Routes>
    </div>
  );
}

export default App;
