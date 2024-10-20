import React from 'react';
import logo from './logo.png';

function Footer() {
    return (
      <footer className="footer">
      <section className="footer-section">
        <div>
          <img height={150} width={450} src={logo} alt="Little Lemon logo" />
        </div>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/reservations">Reservations</a></li>
            <li><a href="/order">Order Online</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
        <section>
          <h2>Contact</h2>
          <ul>
          <p>Phone: +1 (234) 567-890</p>
          <p>Address: 123 Main St, Chicago, IL 12345, United States</p>
          <p>Email: littlelemon@example.com</p>
          </ul>
        </section>
        <aside>
          <h2>Social Media</h2>
          <ul>
            <li><a href="/instagram">Instagram</a></li>
            <li><a href="/facebook">Facebook</a></li>
          </ul>
        </aside>
      </section>
    </footer>
  );
}

  export default Footer;
