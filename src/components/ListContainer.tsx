import React from "react";
import {MdClose} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addCard, selectCards} from "../store/cardsSlice";
import {createInputTextOnKeyDownCallback} from "../lib/inputText";
import {List} from "../store/listsSlice";


type Props = {
  list: List
}

export default function ListContainer(props: Props) {

  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const onKeyDown = createInputTextOnKeyDownCallback((input) => dispatch(addCard({listId: props.list.id, name: input})))

  return (
    <>
      <div className="mx-6 pt-2 z-0">
        <div className="w-64 shadow-xl rounded px-4 pb-4">
          <div className="pt-4 flex justify-between">
            <h1>{props.list.name}</h1>
            <button
              className="my-auto focus:outline-none"
              data-testid="open-delete-todo-list-modal"
            >
              <MdClose/>
            </button>
          </div>


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

        </div>
      </div>
    </>
  );
}
