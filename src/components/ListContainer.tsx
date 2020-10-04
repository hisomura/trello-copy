import {MdClose} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addCard, selectCards} from "../store/cardsSlice";
import {createInputTextOnKeyDownCallback} from "../lib/inputText";
import {List} from "../store/listsSlice";
import CardContainer from "./CardContainer";


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
            >
              <MdClose/>
            </button>
          </div>

          <div className="max-w-xl pt-8 z-0">
            <div className="py-2">
              +{" "}
              <input
                className="focus:outline-none ml-1 w-10/12 text-sm"
                onKeyDown={onKeyDown}
                type="text"
              />
            </div>
            <ul>
              {cards.map((card) => {
                return <CardContainer key={card.id} card={card}/>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
