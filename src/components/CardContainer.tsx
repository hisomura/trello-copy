import React, { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { archiveCards, CardsState } from "../store/cardsSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  cardId: string;
  index: number;
};

const CardContainer: React.FC<Props> = (props) => {
  const cardName = useSelector((state: { cards: CardsState }) => state.cards.entities[props.cardId].name);
  const dispatch = useDispatch();
  const archiveHandler = useCallback(() => {
    dispatch(archiveCards({ ids: [props.cardId] }));
  }, [props.cardId]);

  return (
    <Draggable draggableId={props.cardId} index={props.index}>
      {(provided) => (
        <div
          className="flex py-2 border-t"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input className="my-auto mr-2" type="checkbox" onClick={archiveHandler} />
          <p className="text-sm">{cardName}</p>
        </div>
      )}
    </Draggable>
  );
};

export default CardContainer;