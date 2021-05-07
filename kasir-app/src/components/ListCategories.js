import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensilSpoon,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensilSpoon} className="mr-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensilSpoon} className="mr-2" />;
};
export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios.get(API_URL + "categories").then((res) => {
      const categories = res.data;
      this.setState({ categories });
    });
    // .catch((error) => {
    //   console.log("error bos");
    // });
  }
  render() {
    const { categories } = this.state;
    const { changeKategori, kategoriYangDipilih } = this.props;
    return (
      <Col sm={2} mt="3">
        <h4>
          <strong>Kategori</strong>
          <hr />
        </h4>
        <ListGroup>
          {categories &&
            categories.map((kategori) => (
              <ListGroup.Item
                key={kategori.id}
                onClick={() => changeKategori(kategori.nama)}
                className={
                  kategoriYangDipilih === kategori.nama && "kategori-aktif"
                }
                style={{ textAlign: "left", cursor: "pointer" }}
              >
                <h5>
                  <Icon nama={kategori.nama} />
                  {kategori.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>

        <hr />
      </Col>
    );
  }
}
