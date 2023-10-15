import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./autocomple.module.css";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Films } from "../types/types";

interface AutoCompleteProps {
  onInputValue: (
    e: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => void;
  options: Films[];
  onAddClick: (inputValue: string) => void;
  isLoadingSuggestions: boolean;
}

export const AutoComplete = ({
  onInputValue,
  options,
  onAddClick,
  isLoadingSuggestions,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedFilm, setSearchedFilm] = useState<string>("");

  useEffect(() => {
    onInputValue(inputValue, setInputValue);
  }, [inputValue]);

  const addFilm = () => {
    if (!!searchedFilm) {
      onAddClick(searchedFilm);
      setSearchedFilm("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          display: "flex",
          gap: "10px",
          margin: "auto",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={!inputValue ? [] : options.map((option) => option.Title)}
            onChange={(e, value) => setSearchedFilm(value)}
            filterOptions={(x) => x}
            loading={!!inputValue && isLoadingSuggestions}
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
        </Box>
        <Button disabled={options.length < 1} variant="contained" onClick={() => addFilm()}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
