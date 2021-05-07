import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        keranjang.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("error bos", error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="400" />
        <h2>Sukses Pesan</h2>
        <p>Terima Kasih Sudah Memesan</p>

        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
