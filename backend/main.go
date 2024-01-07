package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/users",
		getInventory).Methods("GET")
	router.HandleFunc("/users",
		createInventory).Methods("POST")
	router.HandleFunc("/users/{id}",
		getInventoryByID).Methods("GET")
	router.HandleFunc("/users/{id}",
		updateInventory).Methods("PUT")
	router.HandleFunc("/users/{id}",
		deleteInventory).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all users
func getInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User

	result, err := db.Query("SELECT id, judul_buku,jumlah,nama_peminjam,alamat_peminjam,noHp_peminjam,tanggal_pinjam,tanggal_pengembalian,lama_pinjam from peminjamanBuku_DewiPermataSuci")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var user User
		err := result.Scan(&user.ID,
			&user.Judul_Buku, &user.Jumlah, &user.Nama_Peminjam, &user.Alamat_Peminjam, &user.NoHp_Peminjam, &user.Tanggal_Pinjam, &user.Tanggal_Pengembalian, &user.Lama_Pinjam)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

// Create user
func createInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO peminjamanBuku_DewiPermataSuci(judul_buku,jumlah,nama_peminjam,alamat_peminjam,noHp_peminjam,tanggal_pinjam,tanggal_pengembalian,lama_pinjam) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul_buku := keyVal["judul_buku"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	noHp_peminjam := keyVal["noHp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_pengembalian := keyVal["tanggal_pengembalian"]
	lama_pinjam := keyVal["lama_pinjam"]
	_, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Peminjam Baru Berhasil ditambahkan")
}

// Get user by ID
func getInventoryByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian,lama_pinjam from peminjamanBuku_DewiPermataSuci WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var user User
	for result.Next() {
		err := result.Scan(&user.ID,
			&user.Judul_Buku, &user.Jumlah, &user.Nama_Peminjam, &user.Alamat_Peminjam, &user.NoHp_Peminjam, &user.Tanggal_Pinjam, &user.Tanggal_Pengembalian, &user.Lama_Pinjam)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(user)
}

// Update user
func updateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE peminjamanBuku_DewiPermataSuci SET judul_buku=?, jumlah=?, nama_peminjam=?, alamat_peminjam=?, noHp_peminjam=?, tanggal_pinjam=?, tanggal_pengembalian=?, lama_pinjam=? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul_buku := keyVal["judul_buku"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	noHp_peminjam := keyVal["noHp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_pengembalian := keyVal["tanggal_pengembalian"]
	lama_pinjam := keyVal["lama_pinjam"]

	_, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Pengguna dengan ID = %s sudah di update",
		params["id"])
}

func deleteInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	// stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
	stmt, err := db.Prepare("DELETE FROM peminjamanBuku_DewiPermataSuci WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Pengguna dengan ID = %s sudah dihapus",
		params["id"])
}

type User struct {
	ID                   string `json:"id"`
	Judul_Buku           string `json:"judul_buku"`
	Jumlah               string `json:"jumlah"`
	Nama_Peminjam        string `json:"nama_peminjam"`
	Alamat_Peminjam      string `json:"alamat_peminjam"`
	NoHp_Peminjam        string `json:"noHp_peminjam"`
	Tanggal_Pinjam       string `json:"tanggal_pinjam"`
	Tanggal_Pengembalian string `json:"tanggal_pengembalian"`
	Lama_Pinjam          string `json:"lama_pinjam"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2203839_DewiPermataSuci_uas_pilkomB")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}