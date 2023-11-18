import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Units from './components/Units/Units';
import Home from './components/Home/Home'
import About from './components/About/About '
import Header from './components/Header/Header';
import Unit from './components/Unit/Unit';
import Aparatures from './components/Aparatures/Aparatures';
import Aparature from './components/Aparature/Aparature';
import Contacts from './components/Contacts/Contacts';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/units" element={<Units />} />
          <Route path='/unit/:id' element={<Unit />}/>
          <Route path='/signal' element={<Aparatures />}/>
          <Route path='/aparature/:id' element={<Aparature />}/>
          <Route path='/contacts' element={<Contacts/>} />
        </Route>
      </Routes>
    </BrowserRouter>
);