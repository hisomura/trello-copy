import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "./components/ListContainer";
import { addList, selectActiveLists } from "./store/listsSlice";
import InputBox from "./components/InputBox";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { moveCards } from "./store/cardsSlice";
import { unselectAllTasks } from "./store/selectionsSlice";

export default function Home() {
  const lists = useSelector(selectActiveLists);
  const dispatch = useDispatch();

  const dragEndHandler = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      moveCards({
        ids: [result.draggableId],
        toListId: result.destination.droppableId,
        index: result.destination.index,
      })
    );
    dispatch(unselectAllTasks({}));
  };

  const addTodoList = useCallback((input: string) => {
    // FIXME boardId
    dispatch(addList({ boardId: "default-board", name: input }));
  }, []);

  return (
    <div className="pt-8 pl-6 flex justify-start items-start">
      <DragDropContext onDragEnd={dragEndHandler}>
        {lists.map((list) => (
          <ListContainer key={list.id} list={list} />
        ))}
      </DragDropContext>
      <InputBox label={"+ New Todo List"} inputHandler={addTodoList} />
    </div>
  );
}
