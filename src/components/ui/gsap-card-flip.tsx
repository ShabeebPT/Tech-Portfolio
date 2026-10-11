// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, SplitText);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    getServerReducedMotionSnapshot,
  );
}

const CAPTION_FONT_VW = 1;
const CAPTION_LINE_RATIO = 1.3;
const _CAPTION_LINE_VW = CAPTION_FONT_VW * CAPTION_LINE_RATIO;
const CAPTION_MOBILE_LINE_RATIO = 1.5;
const _CAPTION_MOBILE_LINE = `${3 * CAPTION_MOBILE_LINE_RATIO}vw`;
const _CAPTION_MOBILE_LINE_SM = `${3.5 * CAPTION_MOBILE_LINE_RATIO}vw`;

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop`;

export interface GsapFlipCardItem {
  id?: string | number;
  /** Image URL. Any size works, but a ~4:5 portrait ratio matches the default layout best. */
  image: string;
  alt?: string;
  /** Short line shown next to the opened hero image. */
  caption?: string;
  /** Additional project metadata for portfolio use */
  title?: string;
  description?: string;
  tech?: string[];
  features?: string[];
  github?: string;
  demo?: string;
}

export interface GsapFlipCardProps {
  /** Cards to display. Defaults to a curated set of six sample photos. */
  items?: GsapFlipCardItem[];
  /** Heading shown in the info panel once a card is opened. */
  title?: string;
  /** Small meta line under the heading. */
  meta?: string;
  /** One-line description under the meta line. */
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  /** Card corner radius in pixels. */
  rounded?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  /** Spacing between desktop rail thumbnails in pixels. */
  thumbGap?: number;
  heroWidth?: number;
  heroHeight?: number;
  /** Flip transition duration in seconds. */
  duration?: number;
  /** GSAP ease string driving the Flip transition. */
  ease?: string;
  stackOffsetX?: number;
  stackOffsetY?: number;
  /** Rotation per card in the collapsed desktop stack, in degrees. */
  stackRotation?: number;
  /** Show the "01 / 06" slot counter. */
  showCounter?: boolean;
  captionLines?: number;
  captionFadeDuration?: number;
  captionRevealDuration?: number;
  captionLineStagger?: number;
  /** Called when the opened preview is dismissed. */
  onClose?: () => void;
  className?: string;
  minHeight?: string;
}

const defaultItems: GsapFlipCardItem[] = [
  {
    id: 0,
    image: UNSPLASH("1500534623283-312aade485b7"),
    alt: "Coastal cliffs meeting open water",
    caption: "Late light on the headland, shot from the cliff path.",
  },
  {
    id: 1,
    image: UNSPLASH("1519681393784-d120267933ba"),
    alt: "Mountain range under night sky",
    caption: "The ridge holds its last colour long after the sun goes.",
  },
  {
    id: 2,
    image: UNSPLASH("1470252649378-9c29740c9fa8"),
    alt: "Star field over a dark ridge",
    caption: "Clear enough that night to read the whole sky at once.",
  },
  {
    id: 3,
    image: UNSPLASH("1506905925346-21bda4d32df4"),
    alt: "Mist settling across a valley",
    caption: "Mist gathers in the valley before the morning burns it off.",
  },
  {
    id: 4,
    image: UNSPLASH("1439066615861-d1af74d74000"),
    alt: "Forest ridge in low cloud",
    caption: "Cloud sits low on the treeline and refuses to lift.",
  },
  {
    id: 5,
    image: UNSPLASH("1444927714506-8492d94b4e3d"),
    alt: "Waves breaking along a shoreline",
    caption: "The tide works the same stretch of shore all afternoon.",
  },
];

interface ProjectMediaProps {
  src: string;
  alt?: string;
  isPlaying: boolean;
  className?: string;
}

function ProjectMedia({
  src,
  alt = "",
  isPlaying,
  className,
}: ProjectMediaProps) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isPlaying, isVideo]);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return <img src={src} alt={alt} draggable={false} className={className} />;
}

/**
 * A pile of cards that fans into a hero preview and a thumbnail rail. Tap any
 * frame and the two trade places, same DOM nodes, measured and tweened via
 * GSAP Flip — never re-mounted. Falls back to a stacked mobile layout, and to
 * an instant swap (no Flip travel) under `prefers-reduced-motion`.
 */
export default function GsapFlipCard({
  items = defaultItems,
  title = "GSAP Flip Card",
  meta = "Hyperiux Vault / GSAP Flip / React",
  description = "A pile of cards that fans into a hero and a rail. Tap any frame and the two trade places, same nodes, measured and tweened, never re-mounted.",
  backgroundColor = "transparent",
  textColor = "var(--text-primary)",
  mutedColor = "var(--text-secondary)",
  rounded = 20,
  thumbWidth = 108,
  thumbHeight = 120,
  thumbGap = 12,
  heroWidth = 530,
  heroHeight = 670,
  duration = 0.7,
  ease = "power3.inOut",
  stackOffsetX = 3,
  stackOffsetY = 9,
  stackRotation = 0,
  showCounter = true,
  captionLines: _captionLines = 2,
  captionFadeDuration = 0.25,
  captionRevealDuration = 0.55,
  captionLineStagger = 0.07,
  onClose,
  className = "",
  minHeight = "min-h-[750px]",
}: GsapFlipCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setOrder(items.map((_, i) => i));
  }
  const [opened, setOpened] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const isAnimatingRef = useRef(false);
  const [shownCaption, setShownCaption] = useState<string | undefined>(
    () => items[0]?.caption,
  );
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const captionTweenRef = useRef<gsap.core.Tween | null>(null);
  const captionSplitRef = useRef<SplitText | null>(null);

  const revertCaptionSplit = useCallback(() => {
    captionSplitRef.current?.revert();
    captionSplitRef.current = null;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const registerCard = useCallback(
    (index: number, node: HTMLButtonElement | null) => {
      if (node) cardRefs.current.set(index, node);
      else cardRefs.current.delete(index);
    },
    [],
  );

  const orderedCards = useCallback(
    () =>
      order
        .map((i) => cardRefs.current.get(i))
        .filter(Boolean) as HTMLButtonElement[],
    [order],
  );

  const isMobile = stageWidth > 0 && stageWidth < 768;
  const isNarrow = stageWidth > 0 && stageWidth < 900;
  const railCount = Math.max(items.length - 1, 0);
  const scale = isNarrow ? Math.min(1, stageWidth / 900) : 1;
  const tW = thumbWidth * scale;
  const tH = thumbHeight * scale;
  const gap = thumbGap * scale;
  const hW = Math.min(heroWidth * scale, stageWidth * 0.46);
  const hH = heroHeight * (hW / heroWidth || 1);
  const railX = Math.max(24, stageWidth * 0.045);
  const heroX = stageWidth - hW - railX;
  const stackWidth = Math.min(215 * scale, stageWidth * 0.42);
  const stackHeight = stackWidth * 1.5;

  const slotBox = useCallback(
    (slot: number) => {
      if (slot === 0) {
        return {
          x: heroX,
          y: 0,
          w: hW,
          h: hH,
          r: rounded * scale,
          z: items.length + 1,
        };
      }
      const railHeight = railCount * tH + (railCount - 1) * gap;
      const top = -railHeight / 2 + (slot - 1) * (tH + gap);
      return {
        x: railX,
        y: top + tH / 2,
        w: tW,
        h: tH,
        r: rounded * 0.6 * scale,
        z: items.length - slot,
      };
    },
    [
      heroX,
      hW,
      hH,
      railX,
      tW,
      tH,
      gap,
      railCount,
      rounded,
      scale,
      items.length,
    ],
  );

  const select = useCallback(
    (itemIndex: number) => {
      if (itemIndex === order[0] || isAnimatingRef.current) return;
      if (!isMobile) {
        flipStateRef.current = Flip.getState(orderedCards(), {
          props: "borderRadius",
        });
      }
      setOrder((prev) => {
        const next = [...prev];
        const from = next.indexOf(itemIndex);
        next[from] = next[0];
        next[0] = itemIndex;
        return next;
      });
    },
    [order, orderedCards, isMobile],
  );

  useIsomorphicLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;
    if (reducedMotion || isMobile) return;
    isAnimatingRef.current = true;
    Flip.from(state, {
      duration,
      ease,
      absolute: true,
      props: "borderRadius",
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration }),
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [order, duration, ease, reducedMotion, isMobile]);

  const open = useCallback(() => {
    if (opened || isAnimatingRef.current || stageWidth === 0) return;
    if (reducedMotion) {
      setOpened(true);
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(true);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 1.0,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: 0.04,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
  }, [opened, stageWidth, reducedMotion, orderedCards, duration, ease]);

  const close = useCallback(() => {
    if (!opened || isAnimatingRef.current) return;
    if (reducedMotion) {
      setOpened(false);
      onClose?.();
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(false);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 0.9,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: { each: 0.035, from: "end" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
    onClose?.();
  }, [opened, reducedMotion, orderedCards, duration, ease, onClose]);

  const nextCaption = items[order[0]]?.caption;
  const activeCaption = reducedMotion ? nextCaption : shownCaption;

  useEffect(() => {
    if (reducedMotion || nextCaption === shownCaption) return;
    const el = captionRef.current;
    if (!el) {
      revertCaptionSplit();
      setShownCaption(nextCaption);
      return;
    }
    captionTweenRef.current?.kill();
    captionTweenRef.current = gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: captionFadeDuration,
      ease: "power2.in",
      onComplete: () => {
        revertCaptionSplit();
        setShownCaption(nextCaption);
      },
    });
  }, [
    nextCaption,
    shownCaption,
    reducedMotion,
    captionFadeDuration,
    revertCaptionSplit,
  ]);

  useIsomorphicLayoutEffect(() => {
    const el = captionRef.current;
    if (!el || !activeCaption) return;
    if (reducedMotion) {
      revertCaptionSplit();
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    captionTweenRef.current?.kill();
    revertCaptionSplit();
    gsap.set(el, { opacity: 1, y: 0 });
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "hxs-caption-line",
      mask: "lines",
    });
    captionSplitRef.current = split;
    const lines = split.lines;
    if (!lines?.length) {
      revertCaptionSplit();
      return;
    }
    gsap.set(lines, { yPercent: 100 });
    captionTweenRef.current = gsap.to(lines, {
      yPercent: 0,
      duration: captionRevealDuration,
      stagger: captionLineStagger,
      ease: "power3.out",
    });
    return () => {
      captionTweenRef.current?.kill();
      revertCaptionSplit();
    };
  }, [
    activeCaption,
    reducedMotion,
    captionRevealDuration,
    captionLineStagger,
    revertCaptionSplit,
  ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!opened || items.length < 2) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") select(order[1]);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        select(order[order.length - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, select, close, opened, items.length]);

  if (items.length === 0) return null;

  const heroItemIndex = order[0];
  const heroItem = items[heroItemIndex];
  const heroSlotLabel = heroItemIndex + 1;

  const cardStyle = (itemIndex: number): CSSProperties => {
    const slot = order.indexOf(itemIndex);
    if (!opened) {
      const w = stackWidth;
      const h = stackHeight;
      return {
        position: "absolute",
        left: stageWidth / 2 - w / 2,
        top: "50%",
        width: w,
        height: h,
        borderRadius: rounded * 0.75 * scale,
        transform: `translateY(-50%) translate(${slot * stackOffsetX}px, ${slot * stackOffsetY}px) rotate(${slot * stackRotation}deg)`,
        zIndex: items.length - slot,
      };
    }
    const box = slotBox(slot);
    return {
      position: "absolute",
      left: box.x,
      top: "50%",
      width: box.w,
      height: box.h,
      borderRadius: box.r,
      transform: `translateY(calc(-50% + ${box.y}px))`,
      zIndex: box.z,
    };
  };

  const chromeStyle: CSSProperties = {
    opacity: opened ? 1 : 0,
    transition: "opacity 0.5s ease 0.25s",
    pointerEvents: opened ? undefined : "none",
  };

  if (isMobile) {
    return (
      <div
        ref={rootRef}
        className={`hxs-gsap-flip-card relative w-full ${minHeight} overflow-y-auto ${className}`}
        style={{ background: backgroundColor, color: textColor }}
      >
        <div className="px-4 py-8 flex flex-col gap-6">
          {showCounter && (
            <div className="text-sm tracking-widest font-mono">
              <span className="font-semibold text-primary">
                {String(heroSlotLabel).padStart(2, "0")}
              </span>
              <span style={{ color: mutedColor }}>
                {" "}
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          )}

          {heroItem && (
            <div
              className="relative w-full aspect-[4/5] max-h-[50vh] overflow-hidden bg-card border border-text-primary/10 shadow-2xl"
              style={{ borderRadius: rounded }}
            >
              <ProjectMedia
                src={heroItem.image}
                alt={heroItem.alt ?? ""}
                isPlaying={true}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight text-text-primary">
              {heroItem?.title ?? title}
            </h3>
            <p className="text-sm text-primary font-mono font-medium">
              {heroItem?.tech ? heroItem.tech.join(" • ") : meta}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {heroItem?.description ?? description}
            </p>
            {activeCaption && (
              <div className="pt-2 text-xs text-text-secondary italic">
                <p ref={captionRef} className="m-0">
                  "{activeCaption}"
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {order.slice(1).map((itemIndex) => {
              const item = items[itemIndex];
              if (!item) return null;
              return (
                <button
                  key={item.id ?? itemIndex}
                  type="button"
                  onClick={() => select(itemIndex)}
                  aria-label={
                    item.alt ?? item.caption ?? `Image ${itemIndex + 1}`
                  }
                  className="relative p-0 border border-text-primary/10 overflow-hidden aspect-[4/5] w-full bg-card hover:border-primary/50 transition-colors"
                  style={{ borderRadius: rounded * 0.6 }}
                >
                  <ProjectMedia
                    src={item.image}
                    alt={item.alt ?? ""}
                    isPlaying={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`hxs-gsap-flip-card relative w-full ${minHeight} overflow-hidden ${className}`}
      style={{ background: backgroundColor, color: textColor }}
    >
      {showCounter && (
        <div
          className="absolute top-6 left-8 text-sm font-mono tracking-widest z-40"
          style={chromeStyle}
        >
          <span className="font-semibold text-primary">
            {String(heroSlotLabel).padStart(2, "0")}
          </span>
          <span style={{ color: mutedColor }}>
            {" "}
            / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}

      <div
        ref={stageRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className={`relative w-full h-full min-h-[680px] ${opened ? "cursor-pointer" : "cursor-default"}`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 max-w-sm z-30 pointer-events-none transition-all ${
            isNarrow ? "hidden" : "block"
          }`}
          style={{
            ...chromeStyle,
            left: railX + tW + Math.max(48, stageWidth * 0.06),
          }}
        >
          <span className="text-primary font-mono text-xs uppercase tracking-wider block mb-2">
            {heroItem?.tech ? heroItem.tech.join(" • ") : meta}
          </span>
          <h3 className="text-3xl font-bold tracking-tight text-text-primary mb-3">
            {heroItem?.title ?? title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {heroItem?.description ?? description}
          </p>

          {heroItem?.features && (
            <ul className="mb-4 space-y-1.5 text-xs text-text-secondary">
              {heroItem.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="text-primary">▹</span> {feat}
                </li>
              ))}
            </ul>
          )}

          {activeCaption && (
            <div className="pt-2 border-t border-text-primary/10">
              <p
                ref={captionRef}
                className="text-xs text-text-secondary/80 italic leading-relaxed m-0"
              >
                "{activeCaption}"
              </p>
            </div>
          )}

          {(heroItem?.github || heroItem?.demo) && (
            <div className="mt-4 flex items-center gap-4 pointer-events-auto">
              {heroItem.github && (
                <a
                  href={heroItem.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-text-primary/5 hover:bg-text-primary/10 border border-text-primary/10 text-text-primary hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  GitHub ↗
                </a>
              )}
              {heroItem.demo && (
                <a
                  href={heroItem.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          )}
        </div>

        {items.map((item, itemIndex) => {
          const isHero = itemIndex === heroItemIndex;
          return (
            <button
              key={item.id ?? itemIndex}
              type="button"
              ref={(n) => registerCard(itemIndex, n)}
              data-flip-id={`hxs-card-${item.id ?? itemIndex}`}
              onClick={() => (opened ? select(itemIndex) : open())}
              aria-label={
                opened
                  ? (item.alt ?? item.caption ?? `Image ${itemIndex + 1}`)
                  : `Open gallery — ${items.length} images`
              }
              aria-current={(opened && isHero) || undefined}
              tabIndex={
                !opened ? (itemIndex === order[0] ? 0 : -1) : isHero ? -1 : 0
              }
              className={`p-0 border border-text-primary/15 bg-card overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] [-webkit-tap-highlight-color:transparent] ${
                !opened || !isHero
                  ? "cursor-pointer hover:border-primary/50"
                  : "cursor-default"
              }`}
              style={cardStyle(itemIndex)}
            >
              <ProjectMedia
                src={item.image}
                alt={item.alt ?? ""}
                isPlaying={opened && isHero}
                className="absolute inset-0 h-full w-full object-cover rounded-[inherit]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium truncate">
                  {item.title ?? item.caption}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
