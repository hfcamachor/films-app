import { AutoComplete } from "./AutoComplete";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function FilmsHorseApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filmName, setFilmName] = useState("");

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

  const onInputValue = async (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const fetchFilmsData = async (inputValue: string) => {
    if (!!inputValue) {
      try {
        const response = await fetch(
          `http://localhost:8000/films?search=${inputValue}`
        );
        const data = await response.json();
        return data.Search || [];
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onAddClick = async (filmName: string) => {
    setFilmName(filmName);
  };

  const fetchFilmInfo = async (filmName: string) => {
    if (!!filmName) {
      try {
        const response = await fetch(
          `http://localhost:8000/filmbytitle?search=${filmName}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("filmInfo", filmInfo);

  return (
    <AutoComplete
      onInputValue={onInputValue}
      onAddClick={onAddClick}
      options={suggestions || []}
      isLoadingSuggestions={isLoading}
    />
  );
}
