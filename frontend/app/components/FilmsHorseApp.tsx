import { AutoComplete } from "./AutoComplete";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageGraph from "./ImageGraph/ImageGraph";
import { FilmsList, Films } from "../types/types";
import AppSnackbar from "./AppSnackbar/AppSnackbar";

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
    if (!!filmInfo && filmInfo.imdbRating !== "N/A") {
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

    return data || [];
  };

  const onAddClick = async (film: Films) => {
    setFilmName(film.imdbID);
  };

  const fetchFilmInfo = async (filmName: string) => {
    const response = await fetch(
      `http://localhost:8000/filmbytitle?search=${filmName}`
    );
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    if (filmInfo) {
      setOpen(true);
      setAddSuccess(filmInfo.imdbRating !== "N/A");
    }
  }, [filmInfo]);

  return (
    <div>
      <AutoComplete
        onInputValue={onInputValue}
        onAddClick={onAddClick}
        options={suggestions || []}
        isLoadingSuggestions={isLoading}
      />
      <ImageGraph films={filmsList} />
      <AppSnackbar
        open={open}
        setOpen={setOpen}
        success={addSuccess}
        title="default title"
        subTitle="default subtitle"
      />
    </div>
  );
}
