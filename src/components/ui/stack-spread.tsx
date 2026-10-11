// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";

// Verified Unsplash images for technical skills / engineering (all 200 OK)
const UNSPLASH = {
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  code: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  laptop:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  analytics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  cyber:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  github:
    "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
  servers:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  wireframe:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
};

const IMG = {
  plane: UNSPLASH.react,
  painting: UNSPLASH.code,
  breaker: UNSPLASH.laptop,
  dog: UNSPLASH.analytics,
  footballer: UNSPLASH.cyber,
  jacket: UNSPLASH.github,
  meadow: UNSPLASH.servers,
  stripes: UNSPLASH.wireframe,
} as const;

// per-image rest scale, keyed by img index (1-8).
const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.75,
};
const s = (i: number) => SCALE[i] ?? 1;

// array order = stack order, back (z 2) -> front (z 9)
export const CARDS: StackSpreadCard[] = [
  // top-left stripes (img08) — sm row 1 left
  {
    item: {
      src: IMG.stripes,
      alt: "Architecture & UI",
      title: "Architecture",
      tag: "System Design",
    },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -26, y: -26, rotate: -4, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right meadow (img07) — sm row 1 right
  {
    item: {
      src: IMG.meadow,
      alt: "Cloud Infrastructure",
      title: "Cloud & DevOps",
      tag: "Docker • CI/CD",
    },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 28, y: -24, rotate: 5, scale: s(7), w: 18, h: 26 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left jacket (img06) — sm row 2 left
  {
    item: {
      src: IMG.jacket,
      alt: "Version Control",
      title: "Git & Versioning",
      tag: "GitHub • GitLab",
    },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -33, y: -2, rotate: -2, scale: s(6), w: 15, h: 24 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre footballer (img05) — sm row 2 right
  {
    item: {
      src: IMG.footballer,
      alt: "Security & Auth",
      title: "Security & Auth",
      tag: "JWT • OAuth • SSL",
    },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 2, y: -28, rotate: 1, scale: s(5), w: 22, h: 24 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right dog (img04) — sm row 3 left
  {
    item: {
      src: IMG.dog,
      alt: "Databases",
      title: "Data Storage",
      tag: "MongoDB • MySQL • Postgres",
    },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 33, y: 4, rotate: 3, scale: s(4), w: 18, h: 26 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left breaker (img03) — sm row 3 right
  {
    item: {
      src: IMG.breaker,
      alt: "Backend APIs",
      title: "Backend Services",
      tag: "Node.js • Express • REST",
    },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -26, y: 24, rotate: 3, scale: s(3), w: 20, h: 22 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre painting (img02) — sm row 4 left
  {
    item: {
      src: IMG.painting,
      alt: "TypeScript Development",
      title: "TypeScript & JS",
      tag: "Strict Types • ESNext",
    },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 28, rotate: -2, scale: s(2), w: 20, h: 24 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right plane (img01) — sm row 4 right
  {
    item: {
      src: IMG.plane,
      alt: "React Frontend",
      title: "Frontend Engineering",
      tag: "React • Next.js • Tailwind",
    },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 28, y: 26, rotate: -3, scale: s(1), w: 17, h: 22 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

const PARALLAX_X = 2.4;
const PARALLAX_Y = 2.0;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const DEFAULT_SUB =
  "Core technologies, architectures, and engineering disciplines that power my full-stack applications.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
  title?: string;
  tag?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  /** final x/y (vw/vh) for tablet + mobile; falls back to `target` */
  targetSm?: { x: number; y: number };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (vw/vh) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
  onCardClick,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
  onCardClick?: () => void;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? (card.stackRotate ?? 0) : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      onClick={onCardClick}
      className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer pointer-events-auto"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
}: {
  item: StackSpreadItem;
  cardRadius: number;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden max-md:rounded-[4vw] border border-text-primary/15 shadow-2xl group bg-card backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {item.title && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end pointer-events-none">
          <span className="text-white text-xs font-semibold tracking-wide truncate">
            {item.title}
          </span>
          {item.tag && (
            <span className="text-primary text-[10px] font-mono truncate">
              {item.tag}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export interface StackSpreadProps {
  cards?: StackSpreadCard[];
  title?: ReactNode;
  subtitle?: string;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
}

export default function StackSpread({
  cards = CARDS,
  title,
  subtitle = DEFAULT_SUB,
  bgColor = "transparent",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 14,
  textColor = "var(--text-primary)",
}: StackSpreadProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const {
    scale: scaleMul,
    small: isSmall,
    colX,
    card: fixedCard,
  } = useResponsive();

  // Scroll tracking: Spreads smoothly as user scrolls into and through the section
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "center center"],
  });

  // Interactive toggle: User can also click any card to force spread/collapse
  const [interactiveSpread, setInteractiveSpread] = useState<boolean | null>(
    null,
  );

  // When interactiveSpread is set, animate between 0 and 1 via spring
  const interactiveMotion = useMotionValue(0);
  const interactiveSpring = useSpring(interactiveMotion, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    if (interactiveSpread === null) return;
    interactiveMotion.set(interactiveSpread ? 1 : 0);
  }, [interactiveSpread, interactiveMotion]);

  // Combined progress: takes interactive state if toggled, otherwise tracks scroll
  const scrollMapped = useTransform(scrollYProgress, [0.15, 0.95], [0, 1]);
  const progress = useTransform(
    [scrollMapped, interactiveSpring],
    ([sP, iP]: number[]) => {
      if (interactiveSpread !== null) return iP;
      return Math.min(Math.max(sP, 0), 1);
    },
  );

  const [isFullySpread, setIsFullySpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setIsFullySpread(p > 0.8);
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(isFullySpread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [0, 0.4], [0.65, 1]);
  const copyScale = useTransform(progress, [0, 0.8], [0.92, 1]);

  const toggleSpread = () => {
    setInteractiveSpread((prev) => (prev === null ? true : !prev));
  };

  return (
    <section
      ref={wrapRef}
      className="relative w-full h-[85vh] lg:h-[90vh] overflow-hidden flex items-center justify-center select-none"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {title ? (
            <h2
              className="w-full whitespace-pre-line text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl"
              style={{ color: textColor }}
            >
              {title}
            </h2>
          ) : (
            <h2
              className="w-full whitespace-pre-line text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl"
              style={{ color: textColor }}
            >
              Engineering
              <span className="text-primary"> That </span>
              Scales.
            </h2>
          )}
          <p
            className="mt-4 w-full max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed tracking-tight text-text-secondary opacity-80 font-normal"
            style={{ color: textColor }}
          >
            {subtitle}
          </p>

          {/* Interactive spread toggle badge */}
          <div className="mt-6 pointer-events-auto">
            <button
              type="button"
              onClick={toggleSpread}
              className="px-4 py-1.5 rounded-full text-xs font-mono font-medium text-text-secondary hover:text-primary bg-background/80 hover:bg-background border border-text-primary/10 hover:border-primary/40 backdrop-blur-md shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} className="text-primary animate-pulse" />
              <span>{isFullySpread ? "Collapse Stack" : "Spread Skills"}</span>
            </button>
          </div>
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
              onCardClick={toggleSpread}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
