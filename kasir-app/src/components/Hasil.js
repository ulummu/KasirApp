import React, { Component } from "react";
import { Col, ListGroup, Row, Badge, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Sukses",
          text: "masuk keranjang " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();
    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      this.props.getListKeranjang();
      swal({
        title: "Hapus Pesanan",
        text: "Sukses hapus " + this.state.keranjangDetail.product.nama,
        icon: "error",
        button: false,
        timer: 1500,
      });
    });
  };
  render() {
    const { keranjang } = this.props;
    return (
      <Col sm={3} mt="3">
        <h4>
          <strong>Hasil</strong>
          <hr />
        </h4>
        {keranjang.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjang.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h6>{menuKeranjang.product.nama}</h6>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
              <hr />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjang={keranjang} {...this.props} />
      </Col>
    );
  }
}
