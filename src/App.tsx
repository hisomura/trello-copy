import React, { EventHandler, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "./components/ListContainer";
import { addList, selectActiveLists } from "./store/listsSlice";
import InputBox from "./components/InputBox";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { moveCards } from "./store/cardsSlice";
import { unselectAllCards } from "./store/selectionsSlice";
import store from "./store/store";

const clickEventHandler: EventHandler<React.MouseEvent<HTMLDivElement>> = (event) => {
  if (event.isDefaultPrevented()) return;

  store.dispatch(unselectAllCards({}));
};

const dragEndHandler = (result: DropResult, _provided: ResponderProvided) => {
  const { source, destination, draggableId } = result;
  if (!destination) return;
  if (source.droppableId === destination.droppableId && source.index === destination.index) return;

  const destIndex =
    source.droppableId === destination.droppableId && source.index < destination.index
      ? destination.index + 1
      : destination.index;
  store.dispatch(
    moveCards({
      ids: [draggableId],
      destListId: destination.droppableId,
      destIndex,
    })
  );
  store.dispatch(unselectAllCards({}));
};

export default function Home() {
  const lists = useSelector(selectActiveLists);
  const dispatch = useDispatch();
  const addTodoList = useCallback((input: string) => {
    // FIXME boardId
    dispatch(addList({ boardId: "default-board", name: input }));
  }, []);

  return (
    <div className="h-screen w-screen" onClick={clickEventHandler}>
      <div className="pt-8 pl-6 flex justify-start items-start">
        <DragDropContext onDragEnd={dragEndHandler}>
          {lists.map((list) => (
            <ListContainer key={list.id} list={list} />
          ))}
        </DragDropContext>
        <InputBox label={"+ New Todo List"} inputHandler={addTodoList} />
      </div>
    </div>
  );
}
