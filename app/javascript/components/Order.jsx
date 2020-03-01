import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import _ from "lodash";

import axios from "../config/axios";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: props.orderItems
    };
  }
  deleteOrderItem = async orderItemId => {
    try {
      let { data, status } = await axios.delete(
        `/orders/${this.props.id}/order_items/${orderItemId}`
      );
      if (status === 200) {
        this.setState(({ orderItems }) => ({
          orderItems: _.remove(
            orderItems,
            orderItem => !(orderItem.id === data.id)
          )
        }));
      }
    } catch (error) {
      alert("Can't delete item.");
    }
  };
  render = () => (
    <>
    <Form>
      <Form.Group>
        <Form.Control as= "select">
          {this.props.products.map(product => (
            <option value={product.id} key={product.id}>{product.name}</option>
          ))}
        </Form.Control>
      <Form.Group>
        <Form.Control type="number"/>
      </Form.Group>
    </Form.Group>
    <Button type="submit" variant="success">
    </Form>
    <Table striped hover>
      <thead>
        <tr>
          <td>SKU</td>
          <td>Name</td>
          <td>Qty</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {this.state.orderItems.map(
          orderItem =>
            orderItem.id && (
              <tr key={orderItem.id}>
                <td>{orderItem.product.sku}</td>
                <td>{orderItem.product.name}</td>
                <td>{orderItem.quantity}</td>
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
  );
}
Order.propTypes = {
  id: PropTypes.number,
  product: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  )
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number,
      id: PropTypes.number,
      product: PropTypes.shape({
        name: PropTypes.string,
        sku: PropTypes.string
      })
    })
  )
};
export default Order;
