
interface Breed {
  id: string;
  name: string;
}

interface Cat {
  id: string;
  url: string;
}

interface BreedDetail {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

interface CatDetail {
  url: string;
  breeds: BreedDetail[];
}
