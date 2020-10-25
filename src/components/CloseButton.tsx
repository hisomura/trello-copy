import React from "react";
import { MdClose } from "react-icons/md";

type Props = {
  onClick: () => void;
};

const CloseButton = React.memo((props: Props) => {
  return (
    <button className="my-auto focus:outline-none" onClick={props.onClick} data-testid="close-list-button">
      <MdClose />
    </button>
  );
});

export default CloseButton;
