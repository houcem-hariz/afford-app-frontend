import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
    return (
        <footer className="page-footer font-small pt-5">
            <div className="container-fluid text-center text-md-left ">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Contacts</h5>
                        <div className="d-flex justify-content-evenly pt-3">
                            <SocialIcon network="facebook" url="#" />
                            <SocialIcon network="instagram" url="#" />
                            <SocialIcon network="twitter" url="#" />
                        </div>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/stores">Stores</a></li>
                            <li><a href="/categories">Categories</a></li>
                            <li><a href="/products">Products</a></li>
                            {/* <li><a href="/users">Users</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>

            <p className="footer-copyright text-center py-3 mt-5 mb-3 ">
                Copyright &copy; <Link className="footer-copyright text-center py-3" to='/'><b>Afford App</b></Link> {new Date().getFullYear()}.
            </p>
        </footer>

    )
}