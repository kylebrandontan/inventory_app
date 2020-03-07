import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup, Form, Alert } from "react-bootstrap";
import _ from "lodash";
import axios from "../config/axios";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      stocks: _.mapKeys(props.stocks, stock => stock.id),
      productId: 1,
      count: 1,
      variant: null
    };
  }
  addStockItem = async e => {
    e.preventDefault();
    try {
      let { data, status } = await axios.post(
        `/warehouses/${this.props.warehouse_id}/stocks/${this.props.id}`,
        {
          stock: {
            product_id: this.state.productId,
            warehouse_id: this.props.warehouse_id
          }
        }
      );
      if (status === 200) {
        this.setState(({ stocks }) => ({
          stocks: { ...stocks, [data.id]: data },
          message: "Successfully added stock.",
          variant: "success"
        }));
      }
    } catch (error) {
      alert("Can't add stock.");
    }
  };
  render = () => (
    <>
      {!_.isNull(this.state.message) && !_.isNull(this.state.variant) && (
        <Alert variant={this.state.variant}>
          <Alert.Heading>{this.state.message}</Alert.Heading>
          <Button
            onClick={() => this.setState({ message: null, variant: null })}
          >
            Close
          </Button>
        </Alert>
      )}
      <Table striped hover>
        <thead>
          <tr>
            <td>Product</td>
            <td>Inventory Count</td>
          </tr>
        </thead>
        <tbody>
          {_.map(
            this.state.stocks,
            stock =>
              stocks.id && (
                <tr key={stock.id}>
                  <td>{stock.product.name}</td>
                  <td>{stock.product.count}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="primary">&#9998;</Button>
                      <Button
                        variant="danger"
                        onClick={() => this.deleteOrderItem(orderItem.id)}
                      >
                        &#128465;
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </>
  );
  }
  Stock.propTypes = {
    id: PropTypes.number,
    product: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sku: PropTypes.string
      })
    ),
    Stocks: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number,
        id: PropTypes.number,
        product: PropTypes.shape({
          name: PropTypes.string
        })
      })
    )
  };

export default Stock;
