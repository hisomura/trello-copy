import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, CardsState } from "../store/cardsSlice";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";
import { listsActions, listsSelectors } from "../store/listsSlice";
import { Droppable } from "react-beautiful-dnd";
import CloseButton from "./CloseButton";
import CardContainer from "./CardContainer";
import { RootState } from "../store/store";

const ListContainer: FC<{ listId: string }> = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => listsSelectors.selectById(state, props.listId));
  if (!list) throw new Error(`List ${props.listId} doesn't exist.`);

  const cardIdsBelongList = useSelector((state: { cards: CardsState }) => state.cards.idsPerList[props.listId] ?? []);

  const onKeyDown = useCallback(
    createInputTextOnKeyDownCallback((input) => dispatch(addCard({ listId: props.listId, name: input }))),
    [props.listId]
  );

  const removeList = useCallback(() => {
    dispatch(listsActions.removeList(props.listId));
  }, [props.listId]);

  return (
    <div className="w-64 shadow-xl rounded p-4 mr-4">
      <div className="pt-4 flex justify-between">
        <h1>{list.name}</h1>
        <CloseButton onClick={removeList} />
      </div>

      <div className="py-2">
        + <input className="focus:outline-none ml-1 w-10/12 text-sm" onKeyDown={onKeyDown} type="text" />
      </div>

      <Droppable droppableId={props.listId}>
        {(provided, _snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cardIdsBelongList.map((cardId, index) => (
              <CardContainer key={cardId} index={index} cardId={cardId} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ListContainer;
