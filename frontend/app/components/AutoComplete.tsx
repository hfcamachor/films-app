import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./autocomple.module.css";
import { Autocomplete, TextField } from "@mui/material";
import { Films } from "../types/types";

interface AutoCompleteProps {
  onInputValue: (
    e: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => void;
  options: Films[];
  onSearchClick: (inputValue: string) => void;
  onAutoCompleteClick: (id: number) => void;
}

type SearchedWords = {
  [key: string]: {};
};

export const AutoComplete = ({
  onInputValue,
  options,
  onSearchClick,
  onAutoCompleteClick,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedWords, setSearchedWords] = useState<SearchedWords>({});

  useEffect(() => {
    onInputValue(inputValue, setInputValue);
  }, [inputValue]);

  const filterValues = () => {
    const listToShow = Object.values(options).filter((elem) => {
      const elemName = elem.name.toLowerCase();
      const inputValueToCheck = inputValue.toLowerCase();
      if (elemName.startsWith(inputValueToCheck)) {
        return elem;
      }
    });

    return listToShow.slice(0, 10);
  };

  const renderSuggestions = () => {
    return (
      <div className={styles.suggestions}>
        <ul className={styles.suggestionsList}>
          {Object.values(filterValues()).map((elem, index) => {
            return (
              <li key={index}>
                <button
                  className={styles.suggestionButton}
                  onClick={() => onAutoCompleteClick(elem.id)}
                >
                  {elem.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={options.map((option) => option.Title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};
