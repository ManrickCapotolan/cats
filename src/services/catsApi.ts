
import axios from 'axios';
export const CATS_BASE_URL = 'https://api.thecatapi.com/v1';

export const getBreeds = async (callback: (data: [] | null) => void) => {
  try {
    const breeds = await axios.get(`${CATS_BASE_URL}/breeds`);
    return callback(breeds.data);
  } catch (e) {
    console.warn('Something went wrong', e);
    callback(null);
  }
};

export const getCats = async (page: number, limit: number, breed_id: string, callback: any) => {
  try {
    const cats = await axios.get(`${CATS_BASE_URL}/images/search`, {
      params: {
        page, limit, breed_id, order: 'desc'
      }
    });
    return callback(cats.data);
  } catch (e) {
    console.warn('Something went wrong', e);
    callback(null);
  }
}

export const getCat = async (id: string, callback: any) => {
  try {
    const details = await axios.get(`${CATS_BASE_URL}/images/${id}`);
    return callback(details.data);
  } catch (e) {
    console.warn('Something went wrong', e);
    callback(null);
  }
}