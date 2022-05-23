import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import Layout from './Layout'
import NoPage from './components/NoPage';
import Register from './components/Authentication/Register';
import Barcode from './components/Barcode';
function App() {
  return (
  
  <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route path="/registration" element={<UserRegistration/>}/>
      <Route path="/user/registration" element={<Register/>}/>
      <Route path="/card" element={<Barcode/>}/>

      {/* missing routes catch */}
      <Route path='*' element={<NoPage/>}/>
    </Route>
  </Routes>
  );
}

export default App;
