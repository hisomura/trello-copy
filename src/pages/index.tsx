import React from "react";
import {useSelector} from "react-redux";
import ListContainer from "../components/ListContainer";
import {selectLists} from "../store/listsSlice";

export default function Home() {
  const lists = useSelector(selectLists);
  return (
    <div className="max-w-xl mx-auto pt-8 z-0 flex justify-end">
      {lists.map(l => <ListContainer key={l.id} list={l}/>)}
    </div>
  );
}
