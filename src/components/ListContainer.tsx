import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, CardsState } from "../store/cardsSlice";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";
import { archiveLists, List } from "../store/listsSlice";
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
    dispatch(archiveLists({ ids: [props.list.id] }));
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
      <div>
        {cardIdsBelongList.map((cardId, index) => (
          <CardContainer key={cardId} index={index} cardId={cardId} />
        ))}
      </div>
    </div>
  );
}
