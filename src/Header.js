import React from 'react';
import logo from './logo.png';
import Nav from './Nav'

function Header() {
    return (
      <header className="header">
        <section className="image-section2">
        <img height={150} width={450} src={logo} alt="Little Lemon logo"/>
        </section>
        <Nav/>
	    </header>
    );
  }

  export default Header;
