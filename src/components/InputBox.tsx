import React, { useEffect, useRef, useState } from "react";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";

type Props = {
  inputHandler: (value: string) => void;
  label: string;
};

export default function InputBox(props: Props) {
  const [inputMode, setInputMode] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  const onKeyDown = createInputTextOnKeyDownCallback((input) => {
    props.inputHandler(input);
  });

  useEffect(() => {
    if (inputMode && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputMode]);

  return (
    <div className="w-64 shadow-xl rounded p-4 mr-4">
      <div className="pt-4">
        {inputMode ? (
          <input
            type="text"
            id="new-todo-list"
            className="focus:outline-none ml-1 w-10/12"
            ref={inputEl}
            onKeyDown={onKeyDown}
            onBlur={() => setInputMode(false)}
          />
        ) : (
          <h1 className="cursor-pointer " onClick={() => setInputMode(true)}>
            {props.label}
          </h1>
        )}
      </div>
    </div>
  );
}
