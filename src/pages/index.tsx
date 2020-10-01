import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCard, selectCards} from "../store/cardsSlice";
import {createInputTextOnKeyDownCallback} from "../lib/inputText";

export default function Home() {
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();
  const onKeyDown = createInputTextOnKeyDownCallback((input) => dispatch(addCard({listId: 'list-id-1', name: input})))

  return (
    <div className="max-w-xl mx-auto pt-8 z-0 flex justify-end">
      <div className="py-2">
        +{" "}
        <input
          className="ml-1 w-10/12 text-sm"
          onKeyDown={onKeyDown}
          type="text"
        />
      </div>
      {cards.map((card) => {
        return <div id={card.id}>{card.name}</div>;
      })}
    </div>
  );
}
