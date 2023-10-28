import logoPath from '../images/logo.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ setDarkTheme, isDarkTheme, onLogout, loggedIn }) {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const navigate = useNavigate();

  function handleMenuClick() {
    setMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleLogoutClick() {
      onLogout();
      navigate('/signup');
  }

  // function handleSignupMenuClick() {
  //   if (loggedIn) {
  //     onSignOut()
  //   } else {
  //     setUserOnSignupScreeen(!isUserOnSignupScreeen)
  //   }
  // }

  // useEffect(() => {
  //   if (isUserOnSignupScreeen) {
  //     navigate('/signup')
  //   } else {
  //     // navigate('/signin')
  //   }
  // }, [isUserOnSignupScreeen]);

  const checkHandler = () => {
    setDarkTheme(!isDarkTheme);
  }

  return (
    <header className="header">
        <img className="header__logo" src={logoPath} alt="Логотип"/>
        {/* <div className={`header__menu ${isMobileMenuOpened ? 'header__menu_opened' : ''}`}> */}
        <div className='header__menu'>
            {/* {loggedIn && <a className="header__menu-email">{userEmail}</a>} */}
            {/* {!loggedIn && <Link onClick={handleSignupMenuClick} className="header__menu-button">{loggedIn ? "Выйти" : (isUserOnSignupScreeen ? 'Войти' : 'Зарегистрироваться')}</Link>} */}
          {/* </div> */}
          <div className="header__theme-wrapper">
            <label className="header__theme-button" aria-label="Сменить тему">
              <input type="checkbox" className="header__theme-switcher-input" checked={isDarkTheme} onChange={checkHandler}/>
            </label>
          </div>
          {loggedIn && <button onClick={handleLogoutClick} className="header__logout-button"/>}
        </div>
        {/* <Link onClick={handleMenuClick} className={`header__menu-burger ${isMobileMenuOpened ? 'header__menu-burger_icon_close' : 'header__menu-burger_icon_burger'}`}></Link> */}
    </header>
  );
}

export default Header;
