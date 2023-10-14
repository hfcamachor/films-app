"use client";

import styles from "./page.module.css";
import { AutoComplete } from "./components/AutoComplete";
import { Dispatch, SetStateAction, useState } from "react";
import { Films } from "./types/types";

export default function Home() {
  const [films, setFilms] = useState<Films[]>([]);

  const fetchFilmsData = async (
    inputValue: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => {
    console.log("inputValue", inputValue)
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

  // console.log("films", films);

  return (
    <main className={styles.main}>
      <div>
        <AutoComplete
          onInputValue={fetchFilmsData}
          onSearchClick={searchClick}
          onAutoCompleteClick={autoCompleteClick}
          options={films || []}
        />
      </div>
    </main>
  );
}
