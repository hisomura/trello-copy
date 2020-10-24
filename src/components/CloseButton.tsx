import { useDispatch } from "react-redux";
import React from "react";
import { MdClose } from "react-icons/md";
import { PayloadAction } from "@reduxjs/toolkit";

type Props<T extends {} = {}> = {
  action: PayloadAction<T>;
};

const CloseButton = React.memo((props: Props) => {
  const dispatch = useDispatch();
  return (
    <button className="my-auto focus:outline-none" onClick={() => dispatch(props.action)}>
      <MdClose />
    </button>
  );
});

export default CloseButton;

