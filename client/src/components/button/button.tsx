import * as React from "react";
import * as classnames from "classnames";

interface ButtonProps {
  label: string;
  onClick: (v?: any) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={classnames("rat-button", props.className)}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
