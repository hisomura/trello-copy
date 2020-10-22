import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "../store/cardsSlice";

type Props = {
  key: string;
  index: number;
  card: Card;
};

export default function CardContainer(props: Props) {
  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided) => (
        <li
          className="flex py-2 border-t"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input className="my-auto mr-2" type="checkbox" />
          <p className="text-sm">{props.card.name}</p>
        </li>
      )}
    </Draggable>
  );
}
