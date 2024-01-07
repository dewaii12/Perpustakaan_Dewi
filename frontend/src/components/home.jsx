import React, { Component } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if you are using React Router

class Home extends Component {
  render() {
    return (
      <main>
        <div className="wrap">
          <div id="Home">
            <h1>SELAMAT DATANG <br />PERPUSTAKAAN BERSAMA</h1>
            <p>Tempat terbaik untuk mengeksplorasi dunia buku.</p>
            <Link to="/add-user/_add" className="button">Mulai Peminjaman</Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
