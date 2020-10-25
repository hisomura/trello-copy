import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, Card } from "../store/cardsSlice";
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
  const cards = useSelector(
    (state: { cards: Card[] }) => {
      const filtered = state.cards.filter((card) => card.listId === props.list.id);
      filtered.sort((a, b) => a.order - b.order);
      return filtered;
    },
    (left, right) => {
      if (left.length !== right.length) return false;
      for (let i = 0; i < left.length; i += 1) {
        if (left[i] !== right[i]) return false;
      }

      return true;
    }
  );
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
            {cards.map((card, index) => (
              <CardContainer key={card.id} index={index} card={card} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
