import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/users">Data Peminjaman</a></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
