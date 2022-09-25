import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import NavBar from './NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactsPage from './Components/Contact/ContactsPage';
import ContactCard from './Components/Contact/ContactCard';
import NewContact from './Components/Contact/NewContact';
import CompaniesPage from './Components/Companies/CompaniesPage';
import NewCompany from './Components/Companies/NewCompany';
import CompanyCard from './Components/Companies/CompanyCard';
import ProductsPage from './Components/Product/ProductsPage';
import NewProduct from './Components/Product/NewProduct';
import ProductCard from './Components/Product/ProductCard';
// import InitiativesPage from './Components/Companies/Initiative/InitiativesPage';

function App() {

  const conBlackList = ['twitter_url', 'image_url', 'user_id', 'company_id', 'company_products']
  const compBlackList = ['hq_email', 'hq_address_line_2', 'hq_address_line_1', 'primary_contact_pbid', 'verticals', 'linkedin_regularCompanyUrl', 'year_founded', 'employees', 'linkedin_company_id', 'logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']
  const prodBlackList = ['price_sign', 'image_link', 'api_featured_image', 'input_company_name']

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/contacts/new' element={<NewContact conBlackList={conBlackList} />} />
          <Route path='/contacts/:id' element={<ContactCard conBlackList={conBlackList} />} />
          <Route path='/contacts' element={<ContactsPage conBlackList={conBlackList} />} />
          <Route path='/companies/new' element={<NewCompany compBlackList={compBlackList} />} />
          <Route path='/companies/:id' element={<CompanyCard />} />
          <Route path='/companies' element={ <CompaniesPage compBlackList={compBlackList} /> } />
          <Route path='/products/new' element={<NewProduct />} />
          <Route path='/products/:id' element={<ProductCard />} />
          <Route path='/products' element={ <ProductsPage prodBlackList={prodBlackList} />} />

          {/* <Route path='/initiatives' element={ <InitiativesPage />} /> */}
          <Route path='/' element={ <HomePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
