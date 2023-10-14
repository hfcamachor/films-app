"use client";

import styles from "./page.module.css";
import { AutoComplete } from "./components/AutoComplete";
import { Dispatch, SetStateAction, useState } from "react";


export default function Home() {
  const [films, setFilms] = useState();
  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  const fetchFilmsData = async (
    inputValue: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => {

    if (!!inputValue) {
      try {
        const response = await fetch(
          `http://localhost:8000/films?search=${inputValue}`
        );
        const data = await response.json();
        setFilms(data.Search);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const searchClick = () => {};
  const autoCompleteClick = () => {};

  console.log("OMDB_URL", films)

  return (
    <main className={styles.main}>
      <div>
        <AutoComplete
          onInputValue={fetchFilmsData}
          onSearchClick={searchClick}
          onAutoCompleteClick={autoCompleteClick}
          options={{}}
        />
      </div>
    </main>
  );
}
