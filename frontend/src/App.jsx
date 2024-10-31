import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/SignIn';
import RegistrationForm from './components/SignUp';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Logout from './components/Logout';
import Error from './components/Error';
import Prediction from './components/Prediction';
import Review from './components/Review';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/logout" element={ <Logout /> }/>
          <Route path="/prediction" element={ <Prediction /> }/>
          <Route path="/review" element={ <Review /> }/>
          <Route path="*" element={<Error />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
