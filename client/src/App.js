import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import NavBar from './NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactsPage from './Components/Contact/ContactsPage';
import NewContact from './Components/Contact/NewContact';
import CompaniesPage from './Components/Companies/CompaniesPage';
import NewCompany from './Components/Companies/NewCompany';
import ProductsPage from './Components/Product/ProductsPage';
import NewProduct from './Components/Product/NewProduct';
// import InitiativesPage from './Components/Companies/Initiative/InitiativesPage';

function App() {

  const conBlackList = ['twitter_url', 'image_url', 'user_id', 'company_id', 'company_products']
  const compBlackList = ['logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']
  const prodBlackList = ['price_sign', 'image_link', 'api_featured_image', 'input_company_name']

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/contacts/new' element={<NewContact conBlackList={conBlackList} />} />
          <Route path='/contacts' element={<ContactsPage conBlackList={conBlackList} />} />
          <Route path='/companies/new' element={<NewCompany compBlackList={compBlackList} />} />
          <Route path='/companies' element={ <CompaniesPage compBlackList={compBlackList} /> } />
          <Route path='/products/new' element={<NewProduct />} />
          <Route path='/products' element={ <ProductsPage prodBlackList={prodBlackList} />} />

          {/* <Route path='/initiatives' element={ <InitiativesPage />} /> */}
          <Route path='/' element={ <HomePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
