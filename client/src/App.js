import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import NavBar from './NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { Link } from 'react-router-dom';

import Home from './Components/Companies/Home';

import ContactsPage from './Components/Contact/ContactsPage';
import ContactCard from './Components/Contact/ContactCard';
import NewContact from './Components/Contact/NewContact';
import CompaniesPage from './Components/Companies/CompaniesPage';
import NewCompany from './Components/Companies/NewCompany';
import CompanyCard from './Components/Companies/CompanyCard';
import ProductsPage from './Components/Product/ProductsPage';
import NewProduct from './Components/Product/NewProduct';
import ProductCard from './Components/Product/ProductCard';
import Login from './Components/User/Login';
import NewUser from './Components/User/NewUser';

import Profile from './Components/User/Profile';


// import InitiativesPage from './Components/Companies/Initiative/InitiativesPage';

import { useEffect, useState, forwardRef } from 'react';

import 'rsuite/dist/rsuite.min.css'

import {Button, ButtonToolbar, IconButton, CustomProvider, Navbar, Nav, Container, Header, Content, Footer, List, FlexboxGrid, Col, Avatar, Badge} from 'rsuite'

import {Visible, Unvisible, Others, UserBadge, Plus, userTimes, Minus, Site, Peoples, PeoplesCostomize, Storage, Gear} from '@rsuite/icons'


import {setUser, logout} from './features/user/user'
import {useSelector, useDispatch} from 'react-redux'

function App() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const conBlackList = ['real_company_name', 'owner_name', 'twitter_url', 'image_url', 'user_id', 'company_id', 'company_products']
  const compBlackList = ['owner_name', 'description', 'hq_email', 'hq_address_line_2', 'hq_address_line_1', 'primary_contact_pbid', 'verticals', 'linkedin_regularCompanyUrl', 'year_founded', 'employees', 'linkedin_company_id', 'logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']
  const prodBlackList = ['price_sign', 'image_link', 'api_featured_image', 'input_company_name']

  const [toggleMode, setToggleMode] = useState(localStorage.getItem("toggle-mode") === 'true')
  useEffect(() => {
    localStorage.setItem("toggle-mode", toggleMode)
  }, [toggleMode])
  const toggleModeFunc = () => {
    setToggleMode(!toggleMode)
  }
  const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));
  return (
    <div className="App">
      <BrowserRouter>
      <CustomProvider theme={toggleMode ? "dark" : "light"}>
        <Container style={{minHeight: "100vh"}}>
          
          <Header className="header" style={{
    display: 'flex', width: 3000, paddingLeft: 30, height: 70, fontSize: 20
    }}>
          <Navbar appearance='default'>
            <Navbar.Brand className="brand">Carlson</Navbar.Brand>
            <Nav>
                <Nav.Item 
                as={NavLink} 
                children={<HomePage />} 
                href="/"
                icon={<Site/>}>
                  Home
                </Nav.Item>
              <Nav.Item 
                as={NavLink} 
                children={<ContactsPage />} 
                href="/contacts" 
                icon={<UserBadge/>}>
                Contacts
              </Nav.Item>
              <Nav.Item 
                as={NavLink} 
                children={<HomePage />} 
                href="/companies"
                icon={<PeoplesCostomize/>}>
                Companies
              </Nav.Item>
              <Nav.Item 
                as={NavLink} 
                children={<HomePage />} 
                href="/products"
                icon={<Storage/>}>
                Products
              </Nav.Item>
            </Nav>
            {/* <Nav pullRight>
              <Nav.Item>
                <ButtonToolbar>
                  <IconButton onClick={toggleModeFunc} 
                  color="red" 
                  appearance='ghost' 
                  size='lg' 
                  icon={toggleMode ? <Visible /> : <Unvisible />}>{toggleMode ? "Light Mode" : "Dark Mode"}</IconButton>
                </ButtonToolbar>
              </Nav.Item>
            </Nav> */}
            <Nav pullRight>
              <Nav.Menu title="Add New" icon={<Plus/>} >
                <Nav.Item 
                  as={NavLink}
                  children={<NewContact />} 
                  href="/contacts/new"
                  icon={<UserBadge/>}>
                  Contact
                </Nav.Item>
                <Nav.Item
                  as={NavLink} 
                  children={<NewCompany />} 
                  href="/companies/new"
                  icon={<PeoplesCostomize/>}>
                  Company
                </Nav.Item>
                <Nav.Item 
                  as={NavLink} 
                  children={<NewProduct />}
                  href="/products/new"
                  icon={<Storage/>}>
                  Product
                </Nav.Item>
              </Nav.Menu>
            </Nav>
            <Nav pullRight>
              <Nav.Menu title="Settings" icon={<Gear/>}>
              <Nav.Item>
                <ButtonToolbar>
                  <IconButton onClick={toggleModeFunc} 
                  color="red" 
                  appearance='ghost' 
                  size='lg' 
                  icon={toggleMode ? <Visible /> : <Unvisible />}>{toggleMode ? "Light Mode" : "Dark Mode"}</IconButton>
                </ButtonToolbar>
              </Nav.Item>
              <Nav.Item icon={<Others/>}>
                Support
              </Nav.Item>
              <Nav.Item icon={<Others/>}>
                Billing
              </Nav.Item>
              <Nav.Item
                  as={NavLink} 
                  children={<Login />} 
                  href="/login"
                  icon={<UserBadge/>}>
                  Login
              </Nav.Item>
              <Nav.Item
                  as={NavLink} 
                  children={<NewUser />} 
                  href="/newuser"
                  icon={<UserBadge/>}>
                  Create Account
              </Nav.Item>
              <Nav.Item>
                <ButtonToolbar>
                  <IconButton
                    onClick={() => {
                      localStorage.clear();
                      dispatch(logout())
                  }}
                    appearance='ghost'
                    size='xs'
                    icon={<Minus />}
                    >
                      Log out
                  </IconButton>
                </ButtonToolbar>
              </Nav.Item>
              
              </Nav.Menu>
              {/* <Badge content="69">
                <Avatar size="md" src="https://media-exp1.licdn.com/dms/image/C5103AQFOvyuxg-C8lA/profile-displayphoto-shrink_200_200/0/1517234384465?e=1669852800&v=beta&t=qGk8v75g1irvfxW8at7Tm3BgrwcOzFYtNXorqr1aWVY" alt="@will" />
              </Badge> */}

            </Nav>
            {/* <Avatar circle style={{backgroundColor: "orange", fontSize: 14}}>
                  Sam
            </Avatar> */}


            <Nav pullRight>

              { user ? <Navbar.Brand className="user">{user.profile.email}</Navbar.Brand> : <Navbar.Brand className="user">Logged Out</Navbar.Brand>}
              {/* <Navbar.Brand className="user">{user.profile.email}</Navbar.Brand> */}
              
            </Nav>
          </Navbar>
          </Header>
          {/* <NavBar /> */}
          <Content>
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

              <Route path='/newuser' element={<NewUser />} />
              <Route path='/login' element={<Login />} />
              

              <Route path='/profile' element={<Profile />} />
              

              {/* <Route path='/initiatives' element={ <InitiativesPage />} /> */}
              <Route exact path='/' element={ <HomePage />} />
            </Routes>
          </Content>
          <Footer>

            <List>
              <FlexboxGrid justify='space-between'>
                <FlexboxGrid.Item style={{ marginButton: 5, display: "flex", justifyContent: "center"}} as={Col} colspan={6}>
                  <List>
                    <h6>Lead Nectar</h6>
                    <List.Item>New York</List.Item>
                  </List>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={{ marginButton: 5, display: "flex", justifyContent: "center"}} as={Col} colspan={6}>
                <List>
                    <h6>Legal Disclaimer</h6>
                    <List.Item>Lisbon</List.Item>
                  </List>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={{ marginButton: 5, display: "flex", justifyContent: "center"}} as={Col} colspan={6}>
                <List>
                    <h6>Intel</h6>
                    <List.Item>Tulum</List.Item>
                  </List>
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <FlexboxGrid justify='center'>
                <FlexboxGrid.Item>
                  <p>
                    All Rights Reserved
                  </p>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List>
          </Footer>
        
          </Container>
        </CustomProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
