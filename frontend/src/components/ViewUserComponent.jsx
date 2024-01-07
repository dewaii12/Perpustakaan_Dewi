import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getInventoryById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"><b>Detail Peminjaman</b></h3>
          <div className="card-body">
            <div className="row">
              <label className="row1"> Judul Buku            : </label>
              <div> {this.state.user.judul_buku}</div>
            </div>
            <div className="row">
              <label className="row2"> Jumlah                : </label>
              <div> {this.state.user.jumlah}</div>
            </div>
            <div className="row">
              <label> Nama Peminjam         : </label>
              <div> {this.state.user.nama_peminjam}</div>
            </div>
            <div className="row">
              <label> Alamat Peminjam       : </label>
              <div> {this.state.user.alamat_peminjam}</div>
            </div>
            <div className="row">
              <label> Nomor Hp Peminjam     : </label>
              <div> {this.state.user.noHp_peminjam}</div>
            </div>
            <div className="row">
              <label> Tanggal Pinjam        : </label>
              <div> {this.state.user.tanggal_pinjam}</div>
            </div>
            <div className="row">
              <label> Tanggal Pengembalian  : </label>
              <div> {this.state.user.tanggal_pengembalian}</div>
            </div>
            <div className="row">
              <label> Lama Pinjam           : </label>
              <div> {this.state.user.lama_pinjam}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
