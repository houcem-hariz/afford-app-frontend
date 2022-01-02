import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => (
    <Router>
        <Header />
        <div style={{ marginTop: 70, marginBottom: 40 }}>
            {children}
        </div>
        <Footer />
    </Router>
);
export default Layout