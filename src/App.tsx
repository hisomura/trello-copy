import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "./components/ListContainer";
import { selectActiveLists } from "./store/listsSlice";
import NewList from "./components/NewList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { moveCards } from "./store/cardsSlice";

export default function Home() {
  const lists = useSelector(selectActiveLists);
  const dispatch = useDispatch();

  const dragEndHandler = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      moveCards({
        targetIds: [result.draggableId],
        fromListId: result.source.droppableId,
        toListId: result.destination.droppableId,
        index: result.destination.index,
      })
    );
  };
  return (
    <div className="max-w-xl mr-auto pt-8 z-0 flex justify-start">
      <DragDropContext onDragEnd={dragEndHandler}>
        {lists.map((l) => (
          <ListContainer key={l.id} list={l} />
        ))}
      </DragDropContext>
      <NewList />
    </div>
  );
}
