import React from "react";
import { useState } from "react";

type Props = {
  key: string;
};

export default function DragTargetLine() {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <div className={selected ? "border-t-2 border-blue-500" : "border-t"} />
    </div>
  );
}
