import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const user = useSelector((state) => state.user.user);
    // const [ok, setOk] = useState(false);
    // const auth = async () => {
    //     await axios.get('/player/auth')
    //         .then((response) => {
    //             setOk(response.data);
    //         }).catch((err) => {console.log(err)})
    // }
    // useEffect(() => {
    //     auth();
    // }, [])

    return (
        <header>
            <div className="header-wrapper">
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/'><div className="header-logo">Cryptoy</div></Link>
                <ul className="header-menu">
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/auction"><li>All Toys</li></Link>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile"><li>Profile</li></Link>
                    {user ? <a href="http://localhost:3001/player/logout" style={{ textDecoration: 'none', color: 'black' }} ><li className="logIn">Logout</li></a> : <Link style={{ textDecoration: 'none', color: 'black' }} to="/login"><li className="logIn">LogIn</li></Link> }
                </ul>
            </div>
        </header>
    )
}
export default Navigation;