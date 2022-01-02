import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="page-footer font-small pt-5">
            <div className="container-fluid text-center text-md-left ">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>Here you can use rows and columns to organize your footer content.</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/stores">Stores</a></li>
                            <li><a href="/categories">Categories</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/users">Users</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Link 1</a></li>
                            <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="text-muted footer-copyright text-center py-3 mt-5 mb-3 ">
                Copyright &copy; <Link className="footer-copyright text-center py-3" to='/'><b>Afford App</b></Link> {new Date().getFullYear()}.
            </p>
        </footer>

    )
}