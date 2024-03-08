import { AutoComplete } from "./AutoComplete";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageGraph from "./ImageGraph";
import { FilmsList } from "../types/types";
import AppSnackbar from "./AppSnackbar";

export default function FilmsHorseApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filmName, setFilmName] = useState("");
  const [filmsList, setFilmsList] = useState<FilmsList[]>([]);
  const [open, setOpen] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const { data: suggestions, isLoading } = useQuery(
    ["suggestions", searchTerm],
    () => fetchFilmsData(searchTerm),
    {
      enabled: searchTerm.length > 0,
    }
  );

  const { data: filmInfo, isLoading: isLoadingFilm } = useQuery(
    ["suggestions", filmName],
    () => fetchFilmInfo(filmName),
    {
      enabled: filmName.length > 0,
    }
  );

  useEffect(() => {
    if (!!filmInfo) {
      const films = [...filmsList, filmInfo];
      setFilmsList(films);
    }
  }, [filmInfo]);

  const onInputValue = async (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const fetchFilmsData = async (inputValue: string) => {
    const response = await fetch(
      `http://localhost:8000/films?search=${inputValue}`
    );
    const data = await response.json();
    return data.Search || [];
  };

  const onAddClick = async (filmName: string) => {
    setFilmName(filmName);
  };

  const fetchFilmInfo = async (filmName: string) => {
    const response = await fetch(
      `http://localhost:8000/filmbytitle?search=${filmName}`
    );
    const data = await response.json();
    return data;
  };

  const handleClick = () => {
    setOpen(true);
  };
  console.log("open", open);

  return (
    <div>
      <AutoComplete
        onInputValue={onInputValue}
        onAddClick={onAddClick}
        options={suggestions || []}
        isLoadingSuggestions={isLoading}
      />
      <ImageGraph films={filmsList} />
      <AppSnackbar open={open} setOpen={setOpen} success={addSuccess} />
      <button
        type="button"
        onClick={() => {
          handleClick();
          setAddSuccess(true);
        }}
      >
        Open snackbar success
      </button>
      <button
        type="button"
        onClick={() => {
          handleClick();
          setAddSuccess(false);
        }}
      >
        Open snackbar error
      </button>
    </div>
  );
}
