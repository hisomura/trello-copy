import React, { useCallback, useRef } from "react";
import { archiveCards, CardsState, moveCards } from "../store/cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

type Props = {
  cardId: string;
  index: number;
};

const CardContainer: React.FC<Props> = (props) => {
  const cardName = useSelector((state: { cards: CardsState }) => state.cards.entities[props.cardId].name);
  const listId = useSelector((state: { cards: CardsState }) => state.cards.entities[props.cardId].listId);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<DragCardObject, {}, {}>({
    item: { type: "card", cardId: props.cardId, index: props.index, listId },
    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop<DragCardObject, {}, {}>({
    accept: "card",
    drop(item, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dropIndex = props.index;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!;

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY < hoverMiddleY) {
        dispatch(moveCards({ ids: [item.cardId], toListId: listId, index: dropIndex }));
      } else {
        dispatch(moveCards({ ids: [item.cardId], toListId: listId, index: dropIndex + 1 }));
      }

      return undefined;
    },
  });

  const archiveHandler = useCallback(() => {
    dispatch(archiveCards({ ids: [props.cardId] }));
  }, [props.cardId]);
  drag(drop(ref));

  return (
    <div className="flex py-2 border-t" ref={ref}>
      <input className="my-auto mr-2" type="checkbox" onClick={archiveHandler} />
      <p className="text-sm">{cardName}</p>
    </div>
  );
};

export default CardContainer;