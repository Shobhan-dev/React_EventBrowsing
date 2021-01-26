import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './Screens/HomeScreen';
// import ProductScreen from './Screens/ProductScreen';
import EventScreen from './Screens/EventScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
// import ProductListScreen from './Screens/ProductListScreen';
import EventListScreen from './Screens/EventListScreen';
// import ProductEditScreen from './Screens/ProductEditScreen';
import EventEditScreen from './Screens/EventEditScreen';
import OrderListScreen from './Screens/OrderListScreen';





function App() {
  return (

    <Router>
      <Header />
      <Container>
        <main className='py-3'>
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          {/* <Route path='/product/:id' component={ProductScreen} /> */}
          <Route path='/event/:id' component={EventScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          {/* <Route path='/admin/productlist' component={ProductListScreen} /> */}
          <Route path='/admin/eventlist' component={EventListScreen} />
          {/* <Route path='/admin/product/:id/edit' component={ProductEditScreen} /> */}
          <Route path='/admin/event/:id/edit' component={EventEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </main>  
      </Container>  
      <Footer />
    </Router>
  );
}

export default App;
