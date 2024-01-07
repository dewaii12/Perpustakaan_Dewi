import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            deletingUserId: null,
            searchQuery: '',
        };

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteInventory = this.deleteInventory.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    deleteInventory(id) {
        UserService.deleteInventory(id).then((res) => {
            this.setState({
                users: this.state.users.filter((user) => user.id !== id),
            });
        });
    }

    showDeleteConfirmation(id) {
        this.setState({ deletingUserId: id });
    }

    cancelDelete() {
        this.setState({ deletingUserId: null });
    }

    confirmDelete() {
        const id = this.state.deletingUserId;

        UserService.deleteInventory(id)
            .then((res) => {
                this.setState({
                    users: this.state.users.filter((user) => user.id !== id),
                    deletingUserId: null,
                });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                this.setState({ deletingUserId: null });
            });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount() {
        UserService.getInventory().then((res) => {
            if (res.data == null) {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data });
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }


    render() {
        return (
            <div className="daftar-peminjaman-container">
                <h2>
                    <b>Daftar Peminjaman Buku</b>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Judul Buku</th>
                            <th>Jumlah</th>
                            <th>Nama Peminjam</th>
                            <th>Alamat Peminjam</th>
                            <th>No. HP Peminjam</th>
                            <th>Tanggal Pinjam</th>
                            <th>Tanggal Pengembalian</th>
                            <th>Lama Pinjam</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.judul_buku}</td>
                                <td>{user.jumlah}</td>
                                <td>{user.nama_peminjam}</td>
                                <td>{user.alamat_peminjam}</td>
                                <td>{user.noHp_peminjam}</td>
                                <td>{user.tanggal_pinjam}</td>
                                <td>{user.tanggal_pengembalian}</td>
                                <td>{user.lama_pinjam}</td>
                                <td>
                                    <button
                                        onClick={() => this.editUser(user.id)}
                                        className="btn1"
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => this.showDeleteConfirmation(user.id)}
                                        className="btn2"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => this.viewUser(user.id)}
                                        className="btn3"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={this.addUser}
                    className="btn-add-user"
                >
                    Add User
                </button>

                {this.state.deletingUserId && (
                    <div className="confirmation-modal">
                        <p>Are you sure you want to delete this user?</p>
                        <button onClick={this.confirmDelete}>Delete</button>
                        <button onClick={this.cancelDelete}>Cancel</button>
                    </div>
                )}
            </div>
        );
    }
}

export default ListUserComponent;
