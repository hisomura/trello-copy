import React from "react";
import { useSelector } from "react-redux";
import ListContainer from "./components/ListContainer";
import { selectLists } from "./store/listsSlice";
import NewList from "./components/NewList";

export default function Home() {
  const lists = useSelector(selectLists);
  return (
    <div className="max-w-xl mr-auto pt-8 z-0 flex justify-start">
      {lists.map((l) => (
        <ListContainer key={l.id} list={l} />
      ))}
      <NewList />
    </div>
  );
}
