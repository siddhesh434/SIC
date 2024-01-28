import PropTypes from 'prop-types';
import iit from './images/iit.png';

function Navbar({ onButtonClick, login, onLogin }) {
    return (
        <nav className="navbar">
            <img src={iit} alt="iiti logo" />
            <div className="nav-buttons">
                <button onClick={() => onButtonClick(0)}>Home</button>
                <button onClick={() => onButtonClick(1)}>About</button>
                <button onClick={() => onButtonClick(2)}>Usage Charges</button>
                <button onClick={() => onButtonClick(3)}>Instruments</button>
                {login === 0 ? (
                    <>
                        <button onClick={() => onButtonClick(4)}>Register</button>
                        <button onClick={() => onButtonClick(5)}>Login</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onButtonClick(6)}>Profile</button>
                        <button onClick={() => onLogin()}>Logout</button>
                    </>

                )}
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    login: PropTypes.number.isRequired, // Assuming login is a number (0 or 1)
};
Navbar.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Navbar;

