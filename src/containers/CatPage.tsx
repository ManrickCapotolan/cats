import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getCat } from '../services/catsApi';

export default function CatPage(props: RouteComponentProps<{ id: string }>) {
  const [details, setDetails] = useState({} as CatDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const result = await getCat(props.match.params.id);
      setDetails(result);
      setLoading(false);
    }

    fetchDetails();
  }, [props.match.params.id]);

  const renderCard = () => {
    return details && details.breeds && details.breeds.length
      ? <Card>
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
      : null;
  }

  return loading
    ? <h5>Loading...</h5>
    : renderCard();
}
