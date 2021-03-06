import React from "react";
import Ripple from "./Ripple";

interface IProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  animationDuration?: number;
}

interface IRipple {
  id: number;
  left: string;
  top: string;
  active: boolean;
  diameter: string;
}

export const RippleEffect: React.FC<IProps> = (props): JSX.Element => {
  const button = React.useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = React.useState<IRipple[]>([]);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!button.current) return;
      const diameter = Math.max(
        button.current.clientWidth,
        button.current.clientHeight
      );
      const radius = diameter / 2;

      const elem = button.current.getBoundingClientRect();

      const left = `${e.clientX + window.scrollX - (elem.left + radius)}px`;
      const top = `${e.clientY + window.scrollY - (elem.top + radius)}px`;

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
    <div
      ref={button}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      {...props}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="RippleEffectChildren">{props.children}</div>
      {ripples.map(({ id, left, top, diameter, active }) => (
        <Ripple
          key={id}
          id={id}
          left={left}
          top={top}
          diameter={diameter}
          active={active}
          color={props.color}
          animationDuration={props.animationDuration}
        />
      ))}
    </div>
  );
};
