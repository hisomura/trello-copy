import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardsState } from "../store/cardsSlice";
import { useSelector } from "react-redux";

type Props = {
  cardId: string;
  index: number;
};

const CardContainer: React.FC<Props> = (props) => {
  const cardName = useSelector((state: { cards: CardsState }) => state.cards.entities[props.cardId].name);
  return (
    <Draggable draggableId={props.cardId} index={props.index}>
      {(provided) => (
        <div
          className="flex py-2 border-t"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input className="my-auto mr-2" type="checkbox" />
          <p className="text-sm">{cardName}</p>
        </div>
      )}
    </Draggable>
  );
};

export default CardContainer