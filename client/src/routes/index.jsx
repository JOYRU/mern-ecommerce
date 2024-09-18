import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Error from '../pages/Error';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';


const Index = () => {
    return(
        <BrowserRouter>
            <Navbar />
            <main>
            <Routes>
                <Route path="/" element={<Home /> } />
                <Route path="/register" element={<Register /> } />
                <Route path="/login" element={<Login /> } />
                <Route path="/cart" element={<Cart /> } />
                <Route path="/*" element={<Error/> } />

            </Routes>
            </main>
            <Footer/>
        </BrowserRouter>

    );
};

export default Index