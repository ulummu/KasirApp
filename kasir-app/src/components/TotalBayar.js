import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { numberWithCommas } from "../utils/utils";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjang,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("./sukses");
    });
  };
  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/*web*/}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h6>
                Total harga :
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h6>
              <Button
                variant="primary"
                block
                className="mb-2 mt-2 mr-2"
                size="md"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong> BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
        {/*mobile*/}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h6>
                Total harga :
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h6>
              <Button
                variant="primary"
                block
                className="mb-2 mt-2 mr-2"
                size="md"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong> BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
