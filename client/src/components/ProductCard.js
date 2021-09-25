import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import styled from "styled-components";

const StyledText = styled.h6`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const StyledImage = styled(Card.Img)`
  width: auto;
  height: 14rem;
  object-fit: cover;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const StyledCard = styled(Card)`
  border-color: white;
`;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

export default function ProductCard({
  _id,
  name,
  description,
  price,
  imageUrl,
}) {
  let history = useHistory();
  return (
    <StyledCard className="shadow p-4">
      <h4>{name}</h4>
      <h5>{formatter.format(price)}</h5>
      <StyledImage variant="top" src={imageUrl} />
      <StyledText>{description}</StyledText>
      <Button
        variant="outline-primary"
        onClick={() => history.push(`/products/${_id}`)}
      >
        View
      </Button>
    </StyledCard>
  );
}
