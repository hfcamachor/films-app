import { FilmsList } from "../types/types";

interface ImageGraphProps {
  films: FilmsList[];
}

const posters = (films: FilmsList[]) => {
  return films.map(film => (
    <div>
      {film.imdbRating}
    </div>
  ))
}

export default function ImageGraph({ films }: ImageGraphProps) {
  return <div>
    {posters(films)}
  </div>;
}
