import React from "react";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-color: white;
`;

export default function CartItem({ item, changeItemQuantity, removeItem }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  });

  const selectOptions = (quantity) => {
    const options = [];
    for (var i = 0; i < quantity; i++) {
      options.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    // console.log(options);
    return options;
  };

  return (
    <StyledCard className="shadow p-4 mb-2">
      <Row>
        <Col lg={2} xs={6}>
          <Image src={item.imageUrl} fluid className="shadow" />
        </Col>
        <Col lg={10} xs={6} className="my-auto">
          <Row>
            <Col lg={4} xs={12} className="my-auto text-center">
              <h4>{item.name}</h4>
            </Col>
            <Col lg={4} xs={12} className="my-auto text-center">
              <h4>{formatter.format(item.price)}</h4>
            </Col>
            <Col lg={4} xs={12} className="my-auto text-center">
              <Row>
                <Col lg={6} xs={6}>
                  <select
                    className="form-select"
                    value={item.quantity}
                    onChange={(event) =>
                      changeItemQuantity(item.product, event.target.value)
                    }
                  >
                    {selectOptions(item.countInStock)}
                  </select>
                </Col>
                <Col lg={6} xs={6}>
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: "1.2rem" }}
                    onClick={() => removeItem(item.product)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledCard>
  );
}
