import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './resetStyles.css';
import { useState, createContext } from 'react';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';
import CustomThemeProvider from './CustomThemeProvider';
import CartPage from './components/pages/CartPage';
//import UserContextProvider from './context/UserContext'
import ShoppingCartContextProvider from './context/shoppingCartContext';
import UserProvider from './context/UserContext';




function App() {
  const [shoppingCart, setShoppingCart] = useState([]);


  const addToCart = () => {

  }
  const removeFromCart = () => {

  }
  const emptyCart = () => {

  }
  return (
    <CustomThemeProvider>
      <UserProvider>
        <ShoppingCartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<SignInPage />} />
              <Route path="/cart" element={<CartPage addToCart={addToCart} removeFromCart={removeFromCart} emptyCart={emptyCart} />} />
            </Routes>
          </BrowserRouter>
        </ShoppingCartContextProvider>
      </UserProvider>
    </CustomThemeProvider>

  );
}

export default App;
