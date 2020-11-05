import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "./components/ListContainer";
import { addList, selectActiveLists } from "./store/listsSlice";
import InputBox from "./components/InputBox";

export default function Home() {
  const lists = useSelector(selectActiveLists);
  const dispatch = useDispatch();

  const addTodoList = useCallback((input: string) => {
    // FIXME boardId
    dispatch(addList({ boardId: "default-board", name: input }));
  }, []);

  return (
    <div className="pt-8 pl-6 flex justify-start items-start">
      {lists.map((list) => (
        <ListContainer key={list.id} list={list} />
      ))}
      <InputBox label={"+ New Todo List"} inputHandler={addTodoList} />
    </div>
  );
}
