import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, CardsState } from "../store/cardsSlice";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";
import { archiveLists, List } from "../store/listsSlice";
import { Droppable } from "react-beautiful-dnd";
import CloseButton from "./CloseButton";
import CardContainer from "./CardContainer";

type Props = {
  list: List;
};

export default function ListContainer(props: Props) {
  const dispatch = useDispatch();
  const cardIdsBelongList = useSelector((state: { cards: CardsState }) => state.cards.idsPerList[props.list.id] ?? []);
  const onKeyDown = createInputTextOnKeyDownCallback((input) =>
    dispatch(addCard({ listId: props.list.id, name: input }))
  );

  const archiveList = useCallback(() => {
    archiveLists({ ids: [props.list.id] });
  }, [props.list.id]);

  return (
    <div className="w-64 shadow-xl rounded p-4 mr-4">
      <div className="pt-4 flex justify-between">
        <h1>{props.list.name}</h1>
        <CloseButton onClick={archiveList} />
      </div>

      <div className="py-2">
        + <input className="focus:outline-none ml-1 w-10/12 text-sm" onKeyDown={onKeyDown} type="text" />
      </div>

      <Droppable droppableId={props.list.id}>
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
}
