import clsx from "clsx";
import { FilmsList } from "../../types/types";
import styles from "./ImageGraph.module.scss";

interface ImageGraphProps {
  films: FilmsList[];
}

const filmsMock = [
  {
    Title: "Spider-Man",
    Year: "2002",
    Rated: "PG-13",
    Released: "03 May 2002",
    Runtime: "121 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Sam Raimi",
    Writer: "Stan Lee, Steve Ditko, David Koepp",
    Actors: "Tobey Maguire, Kirsten Dunst, Willem Dafoe",
    Plot: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 2 Oscars. 17 wins & 65 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "7.4/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "90%",
      },
      {
        Source: "Metacritic",
        Value: "73/100",
      },
    ],
    Metascore: "73",
    imdbRating: "7.4",
    imdbVotes: "869,515",
    imdbID: "tt0145487",
    Type: "movie",
    DVD: "25 Apr 2013",
    BoxOffice: "$407,022,860",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Incredible Hulk",
    Year: "2008",
    Rated: "PG-13",
    Released: "13 Jun 2008",
    Runtime: "112 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Louis Leterrier",
    Writer: "Zak Penn, Stan Lee, Jack Kirby",
    Actors: "Edward Norton, Liv Tyler, Tim Roth",
    Plot: "Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper.",
    Language: "English, Portuguese, Spanish",
    Country: "United States, Canada",
    Awards: "2 wins & 10 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "6.6/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "67%",
      },
      {
        Source: "Metacritic",
        Value: "61/100",
      },
    ],
    Metascore: "61",
    imdbRating: "6.6",
    imdbVotes: "519,538",
    imdbID: "tt0800080",
    Type: "movie",
    DVD: "12 Feb 2014",
    BoxOffice: "$134,806,913",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Spider-Man: Homecoming",
    Year: "2017",
    Rated: "PG-13",
    Released: "07 Jul 2017",
    Runtime: "133 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Jon Watts",
    Writer: "Jonathan Goldstein, John Francis Daley, Jon Watts",
    Actors: "Tom Holland, Michael Keaton, Robert Downey Jr.",
    Plot: "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
    Language: "English, Spanish",
    Country: "United States",
    Awards: "7 wins & 10 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "7.4/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "92%",
      },
      {
        Source: "Metacritic",
        Value: "73/100",
      },
    ],
    Metascore: "73",
    imdbRating: "7.4",
    imdbVotes: "710,865",
    imdbID: "tt2250912",
    Type: "movie",
    DVD: "10 Jul 2017",
    BoxOffice: "$334,201,140",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
];

const posters = (films: FilmsList[]) => {
  return filmsMock.map((film, index) => {
    const backgroundPositionX =
      index === 0 ? 0 : `${(100 / (filmsMock.length - 1)) * (index)}%`;

    return (
      <div
        className={clsx(
          styles.imageGraphItem,
          styles[`imageGraphItem${index + 1}`]
        )}
        style={{ backgroundPositionX: backgroundPositionX }}
      >
        {film.imdbRating}
      </div>
    );
  });
};

export default function ImageGraph({ films }: ImageGraphProps) {
  return <div className={styles.imageGraph}>{posters(films)}</div>;
}
