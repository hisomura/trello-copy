import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, Card } from "../store/cardsSlice";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";
import { archiveLists, List } from "../store/listsSlice";
import CardContainer from "./CardContainer";
import { Droppable } from "react-beautiful-dnd";
import CloseButton from "./CloseButton";

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

  return (
    <Droppable droppableId={props.list.id}>
      {(provided) => (
        <div className="mx-6 pt-2 z-0" ref={provided.innerRef} {...provided.droppableProps}>
          <div className="w-64 shadow-xl rounded px-4 pb-4">
            <div className="pt-4 flex justify-between">
              <h1>{props.list.name}</h1>
              <CloseButton action={archiveLists({ ids: [props.list.id] })} />
            </div>

            <div className="max-w-xl pt-8 z-0">
              <div className="py-2">
                + <input className="focus:outline-none ml-1 w-10/12 text-sm" onKeyDown={onKeyDown} type="text" />
              </div>
              <ul>
                {cards.map((card, index) => (
                  <CardContainer key={card.id} index={index} card={card} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}
