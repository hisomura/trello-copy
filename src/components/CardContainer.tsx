import React, { MouseEventHandler, useCallback } from "react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { archiveCards, CardsState } from "../store/cardsSlice";
import { selectCards, SelectionState, toggleCardSelection, unselectAllCards } from "../store/selectionsSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  cardId: string;
  index: number;
};

const wasToggleInSelectionGroupKeyUsed = (
  event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
) => {
  const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
  return isUsingWindows ? event.ctrlKey : event.metaKey;
};

const getStyle = (isSelected: boolean, isDragging: boolean,  style?: DraggingStyle | NotDraggingStyle) => ({
  ...style,
  backgroundColor: (isSelected || isDragging) ? "#ccc" : "white",
});

const CardContainer: React.FC<Props> = (props) => {
  const cardName = useSelector((state: { cards: CardsState }) => state.cards.entities[props.cardId].name);
  const isSelected = useSelector((state: { selections: SelectionState }) =>
    state.selections.selectedCardIds.includes(props.cardId)
  );
  const dispatch = useDispatch();
  const archiveHandler = useCallback(() => {
    dispatch(archiveCards({ ids: [props.cardId] }));
  }, [props.cardId]);

  const onClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.defaultPrevented) return;

      event.preventDefault();

      if (wasToggleInSelectionGroupKeyUsed(event)) {
        dispatch(toggleCardSelection({ taskId: props.cardId }));
      } else {
        dispatch(unselectAllCards({}));
        dispatch(selectCards({ taskIds: [props.cardId] }));
      }
    },
    [props.cardId]
  );

  return (
    <Draggable draggableId={props.cardId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="flex py-2 border-t"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(isSelected, snapshot.isDragging, provided.draggableProps.style)}
          onClick={onClickHandler}
        >
          <input className="my-auto mr-2" type="checkbox" onClick={archiveHandler} />
          <p className="text-sm">{cardName}</p>
        </div>
      )}
    </Draggable>
  );
};

export default CardContainer;
