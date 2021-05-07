import React, { Component } from "react";
import { Hasil, ListCategories, Menus } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.kategoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("error bos", error);
      });
    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjang !== prevState.keranjang) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjang = res.data;
  //         this.setState({ keranjang });
  //       })
  //       .catch((error) => {
  //         console.log("Error yaa ", error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log("error bos", error);
      });
  };
  changeKategori = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("error bos", error);
      });
  };
  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios.post(API_URL + "keranjangs", keranjang).then((res) => {
          this.getListKeranjang();
          swal({
            title: "Sukses",
            text: "masuk keranjang " + keranjang.product.nama,
            icon: "success",
            button: false,
            timer: 1500,
          });
        });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };
        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            swal({
              title: "Sukses",
              text: "masuk keranjang " + keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      }
    });
  };

  render() {
    const { menus, kategoriYangDipilih, keranjang } = this.state;
    return (
      <div>
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeKategori={this.changeKategori}
                kategoriYangDipilih={kategoriYangDipilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil
                keranjang={keranjang}
                {...this.props}
                getListKeranjang={this.getListKeranjang}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
