"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

interface CursorProps {
  /** Size in pixels when hovering standard text (default: 56) */
  size?: number;
  /** Enlarged diameter when hovering headings / titles (default: 76) */
  textHoverSize?: number;
}

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export const Cursor: React.FC<CursorProps> = ({
  size = 56,
  textHoverSize = 76,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const isInitializedRef = useRef(false);

  const isMounted = useIsMounted();

  // Tracks whether the cursor is currently over a valid text element
  const [isOverText, setIsOverText] = useState(false);
  const isOverTextRef = useRef(false);

  // Tracks heading or prominent text for larger size
  const [isHeading, setIsHeading] = useState(false);
  const isHeadingRef = useRef(false);

  useEffect(() => {
    // Disable on touch / mobile devices without fine pointer
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    const isMedia = (el: HTMLElement | null): boolean => {
      if (!el) return false;

      const tag = el.tagName.toLowerCase();
      // Direct media tags
      if (
        tag === "img" ||
        tag === "picture" ||
        tag === "video" ||
        tag === "canvas" ||
        tag === "svg" ||
        tag === "path" ||
        tag === "circle" ||
        tag === "rect" ||
        tag === "polygon" ||
        tag === "polyline" ||
        tag === "line" ||
        tag === "g"
      ) {
        return true;
      }

      // Explicit no-cursor attribute or role
      if (
        el.getAttribute("role") === "img" ||
        el.hasAttribute("data-no-cursor") ||
        el.classList.contains("no-cursor")
      ) {
        return true;
      }

      // Inside a media element or container
      if (
        el.closest(
          "img, picture, video, canvas, svg, [role='img'], [data-no-cursor], .no-cursor",
        )
      ) {
        return true;
      }

      // Overlay directly covering an image (empty text inside container with an img/video)
      if (
        (!el.textContent || el.textContent.trim().length === 0) &&
        el.parentElement?.querySelector("img, picture, video")
      ) {
        return true;
      }

      return false;
    };

    const isFormInput = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        el.isContentEditable ||
        Boolean(el.closest("input, textarea, select, [contenteditable='true']"))
      );
    };

    const isText = (el: HTMLElement | null): boolean => {
      if (!el) return false;

      // 1. Inputs and form controls keep native browser cursor
      if (isFormInput(el)) return false;

      // 2. Media elements NEVER get inverted cursor
      if (isMedia(el)) return false;

      // 3. Explicit text marker
      if (
        el.hasAttribute("data-cursor-text") ||
        el.closest("[data-cursor-text]")
      ) {
        return true;
      }

      // 4. Standard semantic text tags
      const tag = el.tagName.toLowerCase();
      const textTags = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "strong",
        "em",
        "b",
        "i",
        "blockquote",
        "code",
        "pre",
        "label",
        "li",
        "mark",
        "small",
        "sub",
        "sup",
      ];

      if (textTags.includes(tag)) {
        return Boolean(el.textContent && el.textContent.trim().length > 0);
      }

      // 5. Interactive elements (links, buttons) that contain text
      const interactive = el.closest("a, button, [role='button']");
      if (interactive) {
        if (isMedia(el)) return false;
        return Boolean(
          interactive.textContent && interactive.textContent.trim().length > 0,
        );
      }

      // 6. Direct text nodes within container elements
      const hasDirectText = Array.from(el.childNodes).some(
        (node) =>
          node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()),
      );
      if (hasDirectText) {
        return true;
      }

      return false;
    };

    const checkIsHeading = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (["h1", "h2", "h3", "h4"].includes(tag)) return true;
      return Boolean(el.closest("h1, h2, h3, h4"));
    };

    // Animation loop for smooth cursor follow
    const animate = () => {
      if (!cursorRef.current) return;

      const activeRadius = (isHeadingRef.current ? textHoverSize : size) / 2;
      const currentX = previousPos.current.x;
      const currentY = previousPos.current.y;
      const targetX = targetPos.current.x - activeRadius;
      const targetY = targetPos.current.y - activeRadius;

      const deltaX = (targetX - currentX) * 0.22;
      const deltaY = (targetY - currentY) * 0.22;

      const newX = currentX + deltaX;
      const newY = currentY + deltaY;

      previousPos.current = { x: newX, y: newY };
      cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isInitializedRef.current) {
        const radius = size / 2;
        previousPos.current = {
          x: e.clientX - radius,
          y: e.clientY - radius,
        };
        isInitializedRef.current = true;
      }

      const target = e.target as HTMLElement | null;
      const overText = isText(target);
      const heading = overText && checkIsHeading(target);

      if (overText !== isOverTextRef.current) {
        isOverTextRef.current = overText;
        setIsOverText(overText);
      }

      if (heading !== isHeadingRef.current) {
        isHeadingRef.current = heading;
        setIsHeading(heading);
      }

      // Only hide native cursor when hovering text; restore for images and normal background
      if (overText) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "auto";
      }
    };

    const handleMouseLeave = () => {
      isOverTextRef.current = false;
      setIsOverText(false);
      document.body.style.cursor = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = "auto";
    };
  }, [size, textHoverSize]);

  const activeDiameter = isHeading ? textHoverSize : size;

  if (!isMounted) return null;

  return createPortal(
    <div
      ref={cursorRef}
      className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-[99999] top-0 left-0 transition-[opacity,width,height] duration-200 ease-out will-change-transform"
      style={{
        width: activeDiameter,
        height: activeDiameter,
        opacity: isOverText ? 1 : 0,
      }}
      aria-hidden="true"
    />,
    document.body,
  );
};

export default Cursor;
