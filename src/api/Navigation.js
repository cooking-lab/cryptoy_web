import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const Navigation = () => {
    const [ok, setOk] = useState(false);
    const auth = async () => {
        await axios.get('/player/auth')
            .then((response) => {
                setOk(response.data);
            }).catch((err) => {console.log(err)})
    }
    useEffect(() => {
        auth();
    }, [])

    return (
        <header>
            <div className="header-wrapper">
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/'><div className="header-logo">Cryptoy</div></Link>
                <ul className="header-menu">
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/auction"><li>All Toys</li></Link>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile"><li>Profile(test)</li></Link>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/login"><li className="logIn">${ok ? "Logout" : "Login"}</li></Link>
                </ul>
            </div>
        </header>
    )
}
export default Navigation;