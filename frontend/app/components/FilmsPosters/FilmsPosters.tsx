import styles from "./filmsPosters.module.scss";
import { FilmsList } from "@/app/types/types";
import Image from "next/image";

interface ImageGraphProps {
  films: FilmsList[];
}

export default function FilmsPosters({ films }: ImageGraphProps) {
  const posters = (films: FilmsList[]) => {
    return films.map((film, index) => {
      return (
        <div className={styles.filmsPoster} key={index}>
          <div>{film.Title}</div>
          <div>{film.Year}</div>
          <div className={styles.filmsPosterContainer}>
            {film.Poster !== "N/A" && (
              <Image
                src={film.Poster}
                width={500}
                height={500}
                alt="Picture of the author"
                layout="responsive"
              />
            )}
          </div>
          <div>{film.imdbRating}</div>
        </div>
      );
    });
  };

  return <div className={styles.filmsPosters}>{posters(films)}</div>;
}
