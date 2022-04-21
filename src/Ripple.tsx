import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface IRipple {
	id: number;
  left: string;
  top: string;
	active: boolean;
  diameter: string;
  color: string | undefined;
  animationDuration: number | undefined;
}

const Ripple: React.FC<IRipple> = (props): JSX.Element => {
  return (
    <span
      style={{
        left: props.left,
        top: props.top,
        width: props.diameter,
        height: props.diameter,
        backgroundColor: props.color || 'rgba(255, 255, 255, 0.1)'
      }}
      className={
        classNames(
          "Ripple", 
          !props.active && "Ripple--disabled"
        )
      }
    />
  );
};

export default Ripple;
