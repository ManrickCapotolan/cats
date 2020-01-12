import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getBreeds, getCats } from '../services/catsApi';
import { parseQuery } from '../helpers/queryHelper';
import CatCard from '../components/CatCard/CatCard';

export default function CatList(props: RouteComponentProps) {
  const CAT_LIMIT = 10;

  const [breeds, setBreeds] = useState([] as Breed[]);
  const [cats, setCats] = useState([] as Cat[]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [hideButton, setHideButton] = useState(false);
  
  useEffect(() => {
    async function fetchBreeds() {
      const result = await getBreeds();
      setBreeds(result);
    }

    fetchBreeds();
  }, []);

  useEffect(() => {
    const queryString = props.location.search;
    if (queryString) {
      const { breed } = parseQuery(queryString);
      if (breed) setSelectedBreed(breed);
    }
  }, [props.location.search]);

  useEffect(() => {
    if (selectedBreed) loadCats(1, selectedBreed, []);
  }, [selectedBreed]);

  const loadMore = () => {
    loadCats(page + 1, selectedBreed, cats);
  };

  const loadCats = (page: number, breed: string, initial: Cat[]) => {
    async function fetchCats() {
      setLoading(true);
      const result: Cat[] = await getCats(page, CAT_LIMIT, breed);
      const newCats = result.filter((cat) => initial.map(i => i.id).indexOf(cat.id) < 0); // needed because of how API was written.
      setCats([...initial, ...newCats]);
      setPage(page + 1);
      if (!newCats.length) setHideButton(true);
      setLoading(false);
    }

    fetchCats();
  };
  
  const onSelectChange = (e: any) => {
    setCats([]);
    setSelectedBreed(e.target.value);
    setHideButton(false);
  };

  const renderFilter = () => {
    return <div>
      <Row>
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
    return !loading && !cats.length
      ? <p>No available cats</p>
      : <div>
          <Row>
            { cats.map((cat) => <Col md={3} sm={6} xs={12} key={cat.id}>{ CatCard(cat) }</Col> ) }
          </Row>
        </div>;
  };

  const renderLoadMore = () => {
    return <Row>
      <Col md={3} sm={6} xs={12}>
        <Button variant="success" type="button" onClick={loadMore}>
          {loading ? 'Loading' : 'Load more'}
        </Button>
      </Col>
    </Row>
  };

  return <React.Fragment>
    <h1>Cat Browser</h1>
    { renderFilter() }
    { renderCats() }
    { !hideButton && selectedBreed && renderLoadMore() }
  </React.Fragment>;
}
