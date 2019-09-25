import React from 'react';

const Header = () => {
    
  return (<nav id="navbar">
        <div className='container'>
            <h1 className="logo">
                <a aria-current="page" className="active" href="/">RECIPES</a>
            </h1>
            <ul>
                <li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    )
};

export default Header;
