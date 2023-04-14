import React from "react";
import { v4 as uuid } from "uuid";
import "./ripple-box.css";
const RippleBox = ({ children, rippleColor = "rgba(255, 255, 255, 0.2)" }) => {
    const ref = React.useRef();
    const contentRef = React.useRef();
    React.useEffect(() => {
        const element = ref.current;
        const contentElement = contentRef.current;
        let rippleIdForRemove = null;
        element.style.overflow = "hidden";
        element.style.position = "relative";
        if (contentElement)
            contentElement.classList.add("content-NEG_WNK");
        const handleMouseDown = (e) => {
            const ripple = document.createElement("span");
            const id = uuid();
            ripple.className = "ripple-NEG_WNK";
            ripple.style.background = rippleColor;
            ripple.style.left = e.offsetX + "px";
            ripple.style.top = e.offsetY + "px";
            ripple.style.width = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.style.height = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.id = "ripple-" + id;
            rippleIdForRemove = "#ripple-" + id;
            element.appendChild(ripple);
            setTimeout(() => ripple.classList.add("slower-NEG_WNK"), 300);
        };
        const handleRemoveRipple = () => {
            if (!rippleIdForRemove)
                return;
            const localRipple = document.querySelector(rippleIdForRemove);
            if (!localRipple)
                return;
            localRipple.style.background = "transparent";
            setTimeout(() => localRipple.remove(), 300);
        };
        element.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleRemoveRipple);
        window.addEventListener("dragend", handleRemoveRipple);
        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleRemoveRipple);
            window.removeEventListener("dragend", handleRemoveRipple);
        };
    }, [rippleColor]);
    return children(ref, contentRef);
};
export default RippleBox;
