import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getBreeds, getCats } from '../services/catsApi';
import CatCard from '../components/CatCard';

interface Breed {
  id: string;
  name: string;
}

interface Cat {
  id: string;
  url: string;
}

export default function CatList(props: RouteComponentProps) {
  const CAT_LIMIT = 10;
  const [breeds, setBreeds] = useState([] as Breed[] | null);
  const [cats, setCats] = useState([] as Cat[]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [hideButton, setHideButton] = useState(false);
  
  useEffect(() => { getBreeds(setBreeds) }, []);
  useEffect(() => {
    const queryString = props.location.search;
    if (queryString) {
      const breed = queryString.replace('?', '').split('&')[0].split('=')[1];
      setSelectedBreed(breed);
    }
  }, [props.location.search]);

  const loadCats = (page: number, breed: string, initial: Cat[]) => {
    setLoading(true);
    getCats(page, CAT_LIMIT, breed, (data: Cat[]) => {
      const newCats = data.filter((cat) => initial.map(i => i.id).indexOf(cat.id) < 0);
      setCats([...initial, ...newCats]);
      setLoading(false);
      if (!newCats.length) setHideButton(true);
    });
  };

  // TODO fix useEffects
  useEffect(() => {
    if (selectedBreed) loadCats(page, selectedBreed, []);
  }, [selectedBreed]); // eslint-disable-line
  
  const onSelectChange = (e: any) => {
    setPage(1);
    setSelectedBreed(e.target.value);
    setHideButton(false);
  };

  const loadMore: any = () => {
    loadCats(page + 1, selectedBreed, cats);
    setPage(page + 1);
  }

  const renderFilter = () => {
    return <div>
      <Row noGutters>
        <Col md={3} sm={6} xs={12}>
          <Form.Group controlId="breed">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" value={selectedBreed} onChange={onSelectChange}>
              <option value="">Select breed</option>
              {
                breeds && breeds.length && 
                breeds.map(
                  ({ id, name }) => <option key={id} value={id}>{name}</option>
                )
              }
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  };

  const renderCats = () => {
    if (!loading && !cats.length) return <p>No available cats</p>;
    else return <div>
      <Row>
        { cats.map((cat) => <Col md={3} sm={6} xs={12} key={cat.id}>{ CatCard(cat) }</Col> ) }
      </Row>
    </div>
  }

  const renderLoadMore = () => {
    return <Row>
      <Col md={3} sm={6} xs={12}>
        <Button variant="success" type="button" onClick={loadMore}>
          {loading ? 'Loading' : 'Load more'}
        </Button>
      </Col>
    </Row>
  }
  
  return <div>
    <Container>
      <h1>Cat Browser</h1>
      { renderFilter() }
      { renderCats() }
      { !hideButton && selectedBreed && renderLoadMore() }
    </Container>
  </div>;
}
