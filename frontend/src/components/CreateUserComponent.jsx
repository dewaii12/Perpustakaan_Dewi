import React, { Component } from "react";
import Swal from 'sweetalert2'
import UserService from "../services/UserService";
import anak from './aset/buku.jpg';
import tua from './aset/book.jpeg';

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: "",
      nama_peminjam: "",
      alamat_peminjam: "",
      noHp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
    };
    this.changeJudul_Buku = this.changeJudul_Buku.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeNama_Peminjam = this.changeNama_Peminjam.bind(this);
    this.changeAlamat_Peminjam = this.changeAlamat_Peminjam.bind(this);
    this.changeNoHp_Peminjam = this.changeNoHp_Peminjam.bind(this);
    this.changeTanggal_Pinjam = this.changeTanggal_Pinjam.bind(this);
    this.changeTanggal_Pengembalian = this.changeTanggal_Pengembalian.bind(this);
    this.changeLama_Pinjam = this.changeLama_Pinjam.bind(this);
    this.SimpanOrUpdateInventory = this.SimpanOrUpdateInventory.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getInventoryById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
            judul_buku : user.judul_buku,
            jumlah : user.jumlah,
            nama_peminjam : user.nama_peminjam,
            alamat_peminjam : user.alamat_peminjam,
            noHp_peminjam : user.noHp_peminjam,
            tanggal_pinjam : user.tanggal_pinjam,
            tanggal_pengembalian : user.tanggal_pengembalian,
            lama_pinjam: user.lama_pinjam
        });
      });
    }
  }
  SimpanOrUpdateInventory = (e) => {
    e.preventDefault();
    let user = {
      judul_buku: this.state.judul_buku,
      jumlah: this.state.jumlah,
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      noHp_peminjam: this.state.noHp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_pengembalian: this.state.tanggal_pengembalian,
      lama_pinjam: this.state.lama_pinjam,
    };
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
      UserService.createInventory(user).then((res) => {
        this.props.history.push("/users");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:"Data Berhasil Disimpan",
          showConfirmButton: false,
          timer: 1500
        });
      })
      ;
    } else {
      UserService.updateInventory(user, this.state.id).then((res) => {
        this.props.history.push("/users");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:"Data Berhasil Diupdate",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  };

  changeJudul_Buku = (event) => {
    this.setState({ judul_buku: event.target.value });
  };
  changeJumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };
  changeNama_Peminjam = (event) => {
    this.setState({ nama_peminjam: event.target.value });
  };
  changeAlamat_Peminjam = (event) => {
    this.setState({ alamat_peminjam: event.target.value });
  };
  changeNoHp_Peminjam = (event) => {
    this.setState({ noHp_peminjam: event.target.value });
  };
  changeTanggal_Pinjam = (event) => {
    this.setState({ tanggal_pinjam: event.target.value });
  };
  changeTanggal_Pengembalian = (event) => {
    this.setState({ tanggal_pengembalian: event.target.value });
  };
  changeLama_Pinjam = (event) => {
    this.setState({ lama_pinjam: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div className="form-page">
      <h1><b>Buku adalah Jendela Dunia</b></h1>
      <div className="image-container">
        <img src={anak} alt="Buku Pertama" className="book-image1" />
        <div className="divider"></div>
        <img src={tua} alt="Buku Kedua" className="book-image2" />
        <p>UNESCO menyebutkan Indonesia menempati urutan kedua dari bawah soal literasi dunia.
          Menurut data UNESCO, minat baca masyarakat Indonesia sangat memprihatinkan, hanya 0,001%.
          Artinya, dari 1.000 orang Indonesia, cuma 1 orang yang rajin membaca!<br></br><br></br>
          <b>Mari kita budayakan literasi, setiap buku yang anda baca adalah langkah kecil untuk membangun bangsa yang lebih cerdas dan berpengetahuan luas.</b></p>
      </div>
      <div className="form-container">
        <div className="text-container">
          <h2>Formulir Peminjaman</h2>
          <p>Sebelum meminjam buku, isi form dulu yaa...</p>
        </div>
        {this.state.error && <p className="error-message">{this.state.error}</p>}
        <form onSubmit={this.SimpanOrUpdateInventory}>
          <label>
            Judul Buku:
            <input type="text" name="judul_buku" value={this.state.judul_buku} onChange={this.changeJudul_Buku} />
          </label>
          <label>
            Jumlah:
            <input type="number" name="jumlah" value={this.state.jumlah} onChange={this.changeJumlah} />
          </label>
          <label>
            Nama Peminjam:
            <input type="text" name="nama_peminjam" value={this.state.nama_peminjam} onChange={this.changeNama_Peminjam} />
          </label>
          <label>
            Alamat Peminjam:
            <input type="text" name="alamat_peminjam" value={this.state.alamat_peminjam} onChange={this.changeAlamat_Peminjam} />
          </label>
          <label>
            Nomor Hp Peminjam:
            <input type="text" name="noHp_peminjam" value={this.state.noHp_peminjam} onChange={this.changeNoHp_Peminjam} />
          </label>
          <label>
            Tanggal Pinjam:
            <input type="date" name="tanggal_pinjam" value={this.state.tanggal_pinjam} onChange={this.changeTanggal_Pinjam} />
          </label>
          <label>
            Tanggal Pengembalian:
            <input type="date" name="tanggal_pengembalian" value={this.state.tanggal_pengembalian} onChange={this.changeTanggal_Pengembalian} />
          </label>
          <label>
            Lama Pinjam:
            <input type="text" name="lama_pinjam" value={this.state.lama_pinjam} onChange={this.changeLama_Pinjam} />
          </label>
          <br></br><button type="submit" onClick={this.SimpanOrUpdateInventory}>Simpan</button>
        </form>
      </div>
    </div>
    );
  }
}

export default CreateUserComponent;
