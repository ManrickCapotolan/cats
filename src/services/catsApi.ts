
import axios from 'axios';
export const CATS_BASE_URL = 'https://api.thecatapi.com/v1';

export const getBreeds = async () => {
  const result =  await axios.get(`${CATS_BASE_URL}/breeds`);
  return result.data;
};

export const getCats = async (page: number, limit: number, breed_id: string) => {
  const cats = await axios.get(`${CATS_BASE_URL}/images/search`, {
    params: {
      page, limit, breed_id, order: 'desc'
    }
  });
  return cats.data;
}

export const getCat = async (id: string) => {
  const result = await axios.get(`${CATS_BASE_URL}/images/${id}`);
  return result.data;
}