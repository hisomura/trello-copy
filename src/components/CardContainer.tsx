import React from "react";
import { Card } from "../store/cardsSlice";

type Props = {
  key: string;
  card: Card;
};

export default function CardContainer(props: Props) {
  return (
    <li className="flex py-2 border-t">
      <input className="my-auto mr-2" type="checkbox" />
      <p className="text-sm">{props.card.name}</p>
    </li>
  );
}
