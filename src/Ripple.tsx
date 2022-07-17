import React from "react";
import classNames from "classnames";
import "./index.scss";

interface IRipple {
  id: number;
  left: string;
  top: string;
  active: boolean;
  diameter: string;
  color?: string;
  animationDuration?: number;
}

enum Default {
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  className = "Ripple",
  disabledClassName = "Ripple--disabled",
}

const Ripple: React.FC<IRipple> = ({
  left,
  top,
  diameter,
  color,
  active,
}): JSX.Element => {
  return (
    <span
      style={{
        left,
        top,
        width: diameter,
        height: diameter,
        backgroundColor: color || Default.backgroundColor,
      }}
      className={classNames(
        Default.className,
        active && Default.disabledClassName
      )}
    />
  );
};

export default Ripple;
