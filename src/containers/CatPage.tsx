import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getCat } from '../services/catsApi';

export interface Props {}

export default function CatPage(props: any) {
  const [details, setDetails] = useState({} as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCat(props.match.params.id, (details: Object) => {
      setDetails(details);
      setLoading(false);
    });
  }, [props.match.params.id]);

  return (
    <Container>
      {
        loading
        ? <p>Loading...</p>
        : <Card>
          <Card.Header>
            <Link className="btn btn-primary" to={`/?breed=${details.breeds[0].id}`}>Back</Link>
          </Card.Header>
          <Card.Img src={details.url} />
          <Card.Body>
            <h4>{details.breeds[0].name}</h4>
            <h5>Origin: {details.breeds[0].origin}</h5>
            <h6>{details.breeds[0].temperament}</h6>
            <p>{details.breeds[0].description}</p>
          </Card.Body>
        </Card>
      }
    </Container>
  );
}
