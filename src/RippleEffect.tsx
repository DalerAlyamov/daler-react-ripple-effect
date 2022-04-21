import React from "react";
import Ripple from "./Ripple";

interface IProps {
  children: React.ReactNode;
}

interface IRipple {
	id: number;
  left: string;
  top: string;
	active: boolean;
  diameter: string;
}

export const RippleEffect: React.FC<IProps> = (props): JSX.Element => {
  const button = React.useRef<HTMLButtonElement>(null);

  const [ripples, setRipples] = React.useState<IRipple[]>([]);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!button.current) return;

      const diameter = Math.max(
        button.current.clientWidth,
        button.current.clientHeight
      );
      const radius = diameter / 2;

      const left = `${e.clientX - (button.current.offsetLeft + radius)}px`;
      const top = `${e.clientY - (button.current.offsetTop + radius)}px`;

      setRipples((prev) => [
        ...prev,
        {
          id: new Date().valueOf(),
          left,
          top,
          active: true,
          diameter: diameter + "px",
        },
      ]);
    },
    []
  );

  const handleMouseUp = React.useCallback(() => {
    setRipples((prev) => prev.map((ripple) => ({ ...ripple, active: false })));
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 300);
  }, []);

  return (
    <button
      ref={button}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {props.children}
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          id={ripple.id}
          left={ripple.left}
          diameter={ripple.diameter}
          top={ripple.top}
          active={ripple.active}
        />
      ))}
    </button>
  );
};
