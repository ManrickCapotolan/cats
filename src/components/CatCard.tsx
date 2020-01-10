import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export interface Props {
  id: string;
  url: string;
}

export default function CatCard(props: Props) {
  return <Card>
    <Card.Img variant="top" src={props.url} />
    <Card.Body>
      <Link className="btn btn-primary btn-block" to={'/' + props.id}>View details</Link>
    </Card.Body>
  </Card>
}
