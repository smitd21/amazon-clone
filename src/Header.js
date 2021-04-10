import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider.js';
import { auth } from './firebase';
// The final thingie useStateValue that we get from StateProvider.js

function Header() {
  const [{ basket, user }, dispatch] = useStateValue(); //*Our Data Layers used

  //!This is all u need to do for sign out
  const login = () => {
    if (user) {
      auth.signOut();
    }
  };
  console.log(basket);
  return (
    <nav className="header">
      {/*Logo on the left -> img*/}
      <Link to="/">
        <img
          className="header__logo"
          alt="amazon-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      {/*Search box*/}
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      {/*3 Links -> signin orders prime*/}
      <div className="headerNav">
        {/*1st link using-->Link  will not refresh the page href will*/}
        <Link to={!user && '/login'} className="header__link">
          <div onClick={login} className="header__option">
            <span className="header__optionLineOne">
              Hello, {user ? user.email : 'Guest'}
            </span>
            <span className="header__optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        {/*2nd link*/}
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        {/*3rd link*/}
        <Link to="/login" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>
        {/*4th link*/}
        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            {/*Shopping Basket icon*/}
            <ShoppingBasketIcon />
            {/*Number of items in the basket*/}
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
