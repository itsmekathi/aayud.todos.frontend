import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <Container style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                {children}
            </Container>
            <Footer />
            <ToastContainer />
        </div >
    );
};

export default Layout;