import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import './CatCard.css';

export interface Props {
  id: string;
  url: string;
}

export default function CatCard(props: Props) {
  return <Card className='card'>
    <Card.Img src={props.url} />
    <Card.Body>
      <Link className="btn btn-primary btn-block" to={'/' + props.id}>View details</Link>
    </Card.Body>
  </Card>
}
