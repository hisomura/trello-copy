import React from "react";
import { useEffect, useRef, useState } from "react";
import { createInputTextOnKeyDownCallback } from "../lib/inputText";
import { useDispatch } from "react-redux";
import { addList } from "../store/listsSlice";

export default function NewList() {
  const dispatch = useDispatch();

  const [inputMode, setInputMode] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  const onKeyDown = createInputTextOnKeyDownCallback((input) => {
    dispatch(addList({ boardId: "default-board", name: input }));
  });

  useEffect(() => {
    if (inputMode && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputMode]);

  return (
    <div className="mx-6 pt-2 z-0">
      <div className="w-64 shadow-xl rounded px-4 pb-4">
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
              + New Todo List
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
