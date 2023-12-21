import { Link } from 'react-router-dom';
import '../css/Home.css';

function Navbar() {
    return (
        <div>
            <header>
                <nav className="global-nav">
                    <div className="global-nav-links">
                        <Link to="/" className="product-name">
                            서울 여행
                        </Link>
                        <Link to="/touristspot">관광명소</Link>
                        <Link to="/festival">축제</Link>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Navbar;