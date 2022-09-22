import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import NavBar from './NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactsPage from './Components/Contact/ContactsPage';
import NewContact from './Components/Contact/NewContact';
import CompaniesPage from './Components/Companies/CompaniesPage';
import ProductsPage from './Components/Product/ProductsPage';
// import InitiativesPage from './Components/Companies/Initiative/InitiativesPage';

function App() {

  const conBlackList = ['bio', 'twitter_url', 'image_url', 'user_id']

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/contacts/new' element={<NewContact BlackList={conBlackList} />} />
          <Route path='/contacts' element={<ContactsPage blackList={conBlackList} />} />
          <Route path='/companies' element={ <CompaniesPage /> } />
          <Route path='/products' element={ <ProductsPage />} />
          {/* <Route path='/initiatives' element={ <InitiativesPage />} /> */}
          <Route path='/' element={ <HomePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
