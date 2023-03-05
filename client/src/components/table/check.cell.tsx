import * as React from "react";
import * as FontAwesome from "react-fontawesome";

interface CheckCellProps {
  value: boolean;
}

const CheckCell: React.FC<CheckCellProps> = (props) => {
  return (
    <span className="check-cell">
      {props.value && <FontAwesome name="check" />}
    </span>
  );
};

export default CheckCell;
