import React, { EventHandler, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";

import store, { RootState } from "../store/store";
import { Board, boardsSelectors } from "../store/boardsSlice";
import ListContainer from "./ListContainer";
import InputBox from "./InputBox";
import { moveCards } from "../store/cardsSlice";
import { unselectAllCards } from "../store/selectionsSlice";
import { List, listsActions, listsSelectors } from "../store/listsSlice";

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

  const selectedIds = store.getState().selections.selectedCardIds;
  const ids = selectedIds.length > 0 ? selectedIds : [draggableId];
  store.dispatch(
    moveCards({
      ids,
      destListId: destination.droppableId,
      destIndex,
    })
  );
};

const BoardContainer: FC<{ boardId: string }> = (props) => {
  const dispatch = useDispatch();
  const board = useSelector<RootState, Board | undefined>((state) => boardsSelectors.selectById(state, props.boardId));
  if (!board) throw new Error(`Board ${props.boardId} doesn't exist.`);
  const lists = useSelector<RootState, List[] | undefined>((state) =>
    listsSelectors.selectAll(state).filter((list) => list.boardId === props.boardId)
  );

  const addTodoList = useCallback(
    (input: string) => {
      dispatch(listsActions.addList({ boardId: board.id, name: input }));
    },
    [board.id]
  );

  return (
    <div className="h-screen w-screen" onClick={clickEventHandler}>
      <div className="pt-8 pl-6 flex justify-start items-start">
        {lists ? (
          <DragDropContext onDragEnd={dragEndHandler}>
            {lists.map((list) => (
              <ListContainer key={list.id} listId={list.id} />
            ))}
          </DragDropContext>
        ) : null}
        <InputBox label={"+ New List"} inputHandler={addTodoList} />
      </div>
    </div>
  );
};
export default BoardContainer;
