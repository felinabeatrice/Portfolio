"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Pause, Play } from "lucide-react";
import useBreakpoint from "@/hooks/useBreakpoint";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;
const MIN_SWIPE = 30;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  W: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  A: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
};

function getRandomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((seg) => seg.x === food.x && seg.y === food.y));
  return food;
}

// --- Score Storage ---

function getStoredScores() {
  try {
    const raw = localStorage.getItem("snake-scores");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveScore(score) {
  const scores = getStoredScores();
  scores.unshift({ score, timestamp: Date.now() });
  localStorage.setItem("snake-scores", JSON.stringify(scores.slice(0, 50)));
}

function getAllTimeBest(scores) {
  return scores.length === 0 ? 0 : Math.max(...scores.map((s) => s.score));
}

function getWeeklyBest(scores) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  const mondayTs = monday.getTime();
  const weekScores = scores.filter((s) => s.timestamp >= mondayTs);
  return weekScores.length === 0
    ? 0
    : Math.max(...weekScores.map((s) => s.score));
}

function getRecentScores(scores, count = 5) {
  return scores.slice(0, count);
}

// --- BFS Pathfinding ---

function findPathBFS(start, target, snake, gridSize) {
  const key = (x, y) => `${x},${y}`;

  const snakeSet = new Set(snake.map((s) => key(s.x, s.y)));
  snakeSet.delete(key(snake[snake.length - 1].x, snake[snake.length - 1].y));

  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const queue = [{ x: start.x, y: start.y, path: [] }];
  const visited = new Set();
  visited.add(key(start.x, start.y));

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === target.x && current.y === target.y) {
      return current.path;
    }
    for (const dir of dirs) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      const nk = key(nx, ny);
      if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        !visited.has(nk) &&
        !snakeSet.has(nk)
      ) {
        visited.add(nk);
        queue.push({ x: nx, y: ny, path: [...current.path, dir] });
      }
    }
  }
  return null;
}
function simulatePath(snake, food, path) {
  const simSnake = snake.map((seg) => ({ ...seg }));
  let ateFood = false;

  for (const dir of path) {
    const head = simSnake[0];
    const newHead = {
      x: head.x + dir.x,
      y: head.y + dir.y,
    };

    simSnake.unshift(newHead);

    if (!ateFood && newHead.x === food.x && newHead.y === food.y) {
      ateFood = true;
    } else {
      simSnake.pop();
    }
  }

  return simSnake;
}

function getReachableSpace(start, snake, gridSize) {
  const key = (x, y) => x * gridSize + y;
  const blocked = new Set(snake.map((s) => key(s.x, s.y)));
  blocked.delete(key(snake[snake.length - 1].x, snake[snake.length - 1].y));

  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const visited = new Set([key(start.x, start.y)]);
  const stack = [start];
  let count = 0;

  while (stack.length > 0) {
    const current = stack.pop();
    count++;

    for (const dir of dirs) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      const nk = key(nx, ny);

      if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        !visited.has(nk) &&
        !blocked.has(nk)
      ) {
        visited.add(nk);
        stack.push({ x: nx, y: ny });
      }
    }
  }

  return count;
}
function getAutoPilotDirection(snake, food, currentDir, gridSize) {
  const head = snake[0];
  const { x, y } = head;

  const lastCol = gridSize - 1;
  const lastRow = gridSize - 1;

  // === RETURN LANE — column 0, go DOWN ===
  if (x === 0) {
    // At bottom-left, go right to start scanning
    if (y === lastRow) {
      return { x: 1, y: 0 };
    }
    // Otherwise keep going down
    return { x: 0, y: 1 };
  }

  // === SCANNING ROWS ===

  // Odd rows (1, 3, 5...) — go RIGHT
  if (y % 2 === 1) {
    if (x < lastCol) {
      return { x: 1, y: 0 };
    }
    // At right edge, go down to next row
    return { x: 0, y: 1 };
  }

  // Even rows (0, 2, 4...) — go LEFT
  if (y % 2 === 0) {
    if (x > 1) {
      return { x: -1, y: 0 };
    }
    // At column 1, go down to next row
    // UNLESS at last row — enter return lane
    if (y === lastRow) {
      return { x: -1, y: 0 }; // enter column 0
    }
    return { x: 0, y: 1 };
  }

  return currentDir;
}
// --- Main Component ---

export default function GamePage() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const touchStartRef = useRef(null);

  const [gameState, setGameState] = useState("idle");
  const [score, setScore] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [canvasScale, setCanvasScale] = useState(1);
  const [autoPilot, setAutoPilot] = useState(false);
  const autoPilotRef = useRef(false);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmall = isMobile || isTablet;

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const speedRef = useRef(INITIAL_SPEED);
  const loopRef = useRef(null);
  const pausedRef = useRef(false);
  const wasAutoPilotRef = useRef(false);

  useEffect(() => {
    setAllScores(getStoredScores());
  }, []);

  // Canvas scaling
  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const maxWidth = window.innerWidth - 48;
      setCanvasScale(maxWidth < CANVAS_SIZE ? maxWidth / CANVAS_SIZE : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allTimeBest = getAllTimeBest(allScores);
  const weeklyBest = getWeeklyBest(allScores);
  const recentScores = getRecentScores(allScores, 5);

  // --- Draw ---
  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1a0f28";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "rgba(118,219,219,0.06)";
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        ctx.fillRect(
          x * CELL_SIZE + CELL_SIZE / 2 - 1,
          y * CELL_SIZE + CELL_SIZE / 2 - 1,
          2,
          2
        );
      }
    }

    ctx.fillStyle = "rgba(118,219,219,0.25)";
    ctx.fillRect(0, 0, CANVAS_SIZE, 2);
    ctx.fillRect(0, CANVAS_SIZE - 2, CANVAS_SIZE, 2);
    ctx.fillRect(0, 0, 2, CANVAS_SIZE);
    ctx.fillRect(CANVAS_SIZE - 2, 0, 2, CANVAS_SIZE);

    const food = foodRef.current;
    ctx.fillStyle = "#f75082";
    ctx.shadowColor = "#f75082";
    ctx.shadowBlur = 12;
    ctx.fillRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
    ctx.shadowBlur = 0;

    const snake = snakeRef.current;
    const isAuto = autoPilotRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      if (isAuto) {
        ctx.fillStyle = isHead ? "#ff69b4" : "rgba(255,105,180,0.55)";
        if (isHead) {
          ctx.shadowColor = "#ff69b4";
          ctx.shadowBlur = 14;
        }
      } else {
        ctx.fillStyle = isHead ? "#76dbdb" : "rgba(118,219,219,0.6)";
        if (isHead) {
          ctx.shadowColor = "#76dbdb";
          ctx.shadowBlur = 10;
        }
      }
      ctx.fillRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      if (isHead) ctx.shadowBlur = 0;
    });
  }, []);

  // --- Game Over ---
  const handleGameOver = useCallback(() => {
    setGameState("over");
    if (!wasAutoPilotRef.current) {
      saveScore(scoreRef.current);
      setAllScores(getStoredScores());
    }
    autoPilotRef.current = false;
    setAutoPilot(false);
    if (loopRef.current) clearInterval(loopRef.current);
  }, []);

  // --- Tick ---
  const tick = useCallback(() => {
    if (pausedRef.current) return;

    if (autoPilotRef.current) {
      const autoDir = getAutoPilotDirection(
        snakeRef.current,
        foodRef.current,
        dirRef.current,
        GRID_SIZE
      );
      nextDirRef.current = autoDir;
    }

    dirRef.current = nextDirRef.current;
    const dir = dirRef.current;
    const snake = snakeRef.current;
    const head = snake[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

  if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
  handleGameOver();
  return;
}
    const newSnake = [newHead, ...snake];

    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = getRandomFood(newSnake);

      if (speedRef.current > 60) {
        speedRef.current = Math.max(60, speedRef.current - SPEED_INCREMENT);
        if (loopRef.current) clearInterval(loopRef.current);
        loopRef.current = setInterval(tick, speedRef.current);
      }
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    draw();
  }, [draw, handleGameOver]);

  // --- Start ---
  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = getRandomFood([{ x: 10, y: 10 }]);
    scoreRef.current = 0;
    speedRef.current = INITIAL_SPEED;
    pausedRef.current = false;
    autoPilotRef.current = false;
    wasAutoPilotRef.current = false;
    setAutoPilot(false);
    setScore(0);
    setGameState("playing");
    draw();

    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = setInterval(tick, speedRef.current);
  }, [draw, tick]);

  // --- Pause ---
  const togglePause = useCallback(() => {
    if (gameState !== "playing" && gameState !== "paused") return;
    if (pausedRef.current) {
      pausedRef.current = false;
      setGameState("playing");
      if (loopRef.current) clearInterval(loopRef.current);
      loopRef.current = setInterval(tick, speedRef.current);
    } else {
      pausedRef.current = true;
      setGameState("paused");
      if (loopRef.current) clearInterval(loopRef.current);
    }
  }, [gameState, tick]);

  // --- Auto-pilot toggle ---
  const toggleAutoPilot = useCallback(() => {
    if (gameState !== "playing" && gameState !== "paused") return;

    if (pausedRef.current) {
      pausedRef.current = false;
      setGameState("playing");
      if (loopRef.current) clearInterval(loopRef.current);
      loopRef.current = setInterval(tick, speedRef.current);
    }

    const next = !autoPilotRef.current;
    autoPilotRef.current = next;
    setAutoPilot(next);

    if (next) wasAutoPilotRef.current = true;
  }, [gameState, tick]);

  // --- Keyboard ---
  useEffect(() => {
    const handleKey = (e) => {
      if (DIRECTIONS[e.key]) {
        e.preventDefault();
        const newDir = DIRECTIONS[e.key];
        const curDir = dirRef.current;
        if (newDir.x + curDir.x === 0 && newDir.y + curDir.y === 0) return;
        nextDirRef.current = newDir;
        if (autoPilotRef.current) {
          autoPilotRef.current = false;
          setAutoPilot(false);
        }
        return;
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "over") startGame();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        if (gameState === "playing" || gameState === "paused") togglePause();
        return;
      }

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        toggleAutoPilot();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, startGame, togglePause, toggleAutoPilot]);

  // --- Touch ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < MIN_SWIPE && absDy < MIN_SWIPE) {
        if (gameState === "idle" || gameState === "over") startGame();
        return;
      }

      if (gameState !== "playing") return;

      const newDir =
        absDx > absDy
          ? dx > 0
            ? { x: 1, y: 0 }
            : { x: -1, y: 0 }
          : dy > 0
          ? { x: 0, y: 1 }
          : { x: 0, y: -1 };

      const curDir = dirRef.current;
      if (newDir.x + curDir.x === 0 && newDir.y + curDir.y === 0) return;
      nextDirRef.current = newDir;

      if (autoPilotRef.current) {
        autoPilotRef.current = false;
        setAutoPilot(false);
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameState, startGame]);

  // Prevent scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prevent = (e) => e.preventDefault();
    canvas.addEventListener("touchmove", prevent, { passive: false });
    return () => canvas.removeEventListener("touchmove", prevent);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  const scaledCanvasHeight = CANVAS_SIZE * canvasScale;

  // --- Scoreboard ---
  const Scoreboard = () => (
    <div
      style={{
        padding: isSmall ? "20px" : "24px 28px",
        borderRadius: "16px",
        background: "rgba(118,219,219,0.04)",
        border: "1px solid rgba(118,219,219,0.15)",
        width: isSmall ? "100%" : "220px",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          fontSize: "14px",
          fontWeight: 700,
          color: "#76dbdb",
          letterSpacing: "2px",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        🏆 Scoreboard
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "14px 16px",
          borderRadius: "12px",
          background: "rgba(118,219,219,0.04)",
          border: "1px solid rgba(118,219,219,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 4px 0",
              fontSize: "9px",
              color: "rgba(118,219,219,0.4)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            All-Time
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 800,
              color: "#f75082",
              fontFamily: "var(--font-bitcount), monospace",
            }}
          >
            {allTimeBest}
          </p>
        </div>
        <div style={{ width: "1px", background: "rgba(118,219,219,0.1)" }} />
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 4px 0",
              fontSize: "9px",
              color: "rgba(118,219,219,0.4)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Weekly
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 800,
              color: "#76dbdb",
              fontFamily: "var(--font-bitcount), monospace",
            }}
          >
            {weeklyBest}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: "10px",
          color: "rgba(118,219,219,0.4)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Recent Games
      </p>

      {recentScores.length === 0 ? (
        <p
          style={{
            color: "rgba(118,219,219,0.25)",
            fontSize: "12px",
            margin: 0,
            textAlign: "center",
            padding: "12px 0",
          }}
        >
          No games yet
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {recentScores.map((entry, i) => {
            const isBest = entry.score === allTimeBest && entry.score > 0;
            const date = new Date(entry.timestamp);
            const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: isBest
                    ? "rgba(247,80,130,0.08)"
                    : "rgba(118,219,219,0.02)",
                  border: isBest
                    ? "1px solid rgba(247,80,130,0.2)"
                    : "1px solid rgba(118,219,219,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "rgba(118,219,219,0.3)",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      minWidth: "20px",
                    }}
                  >
                    #{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: isBest ? "#f75082" : "#76dbdb",
                      fontFamily: "var(--font-bitcount), monospace",
                    }}
                  >
                    {entry.score}
                  </span>
                  {isBest && (
                    <span style={{ fontSize: "10px", color: "#f75082" }}>
                      ★
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(118,219,219,0.25)",
                    fontFamily: "monospace",
                  }}
                >
                  {timeStr}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#271a38",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "24px 16px" : "40px 20px",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(118,219,219,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmall ? "16px" : "24px",
          width: "100%",
          maxWidth: isSmall ? "100%" : "720px",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(118,219,219,0.5)",
            textDecoration: "none",
            fontSize: "13px",
            letterSpacing: "1px",
            fontWeight: 600,
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#f75082")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(118,219,219,0.5)")
          }
        >
          <ArrowLeft size={15} />
          Back to Portfolio
        </Link>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#f75082",
              letterSpacing: "4px",
              fontSize: "11px",
              textTransform: "uppercase",
              fontWeight: 700,
              margin: "0 0 8px 0",
            }}
          >
            [F]BN
          </p>
          <h1
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: 400,
              color: "#76dbdb",
              letterSpacing: "4px",
              margin: 0,
              fontFamily: "var(--font-bitcount), monospace",
              textShadow: "0 0 30px rgba(118,219,219,0.3)",
            }}
          >
            ARCADE
          </h1>
        </div>

        {/* Score + Pause + Auto-Pilot row */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Score */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 2px 0",
                fontSize: "10px",
                color: "rgba(118,219,219,0.4)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Score
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 800,
                color: autoPilot ? "#ff69b4" : "#76dbdb",
                fontFamily: "var(--font-bitcount), monospace",
                transition: "color 0.3s ease",
              }}
            >
              {score}
            </p>
          </div>

          {/* Pause button */}
          {(gameState === "playing" || gameState === "paused") && (
            <button
              onClick={togglePause}
              aria-label={gameState === "paused" ? "Resume game" : "Pause game"}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  gameState === "paused"
                    ? "rgba(247,80,130,0.2)"
                    : "rgba(118,219,219,0.08)",
                border:
                  gameState === "paused"
                    ? "1px solid rgba(247,80,130,0.5)"
                    : "1px solid rgba(118,219,219,0.2)",
                color: gameState === "paused" ? "#f75082" : "#76dbdb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              {gameState === "paused" ? (
                <Play size={16} />
              ) : (
                <Pause size={16} />
              )}
            </button>
          )}

          {/* Auto-Pilot button */}
          {(gameState === "playing" || gameState === "paused") && (
            <button
              onClick={toggleAutoPilot}
              aria-label={
                autoPilot ? "Disable auto-pilot" : "Enable auto-pilot"
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "8px 14px",
                borderRadius: "20px",
                background: autoPilot
                  ? "rgba(255,105,180,0.18)"
                  : "rgba(118,219,219,0.06)",
                border: autoPilot
                  ? "1px solid rgba(255,105,180,0.55)"
                  : "1px solid rgba(118,219,219,0.2)",
                color: autoPilot ? "#ff69b4" : "rgba(118,219,219,0.55)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "var(--font-manrope), sans-serif",
                transition: "all 0.3s ease",
                boxShadow: autoPilot
                  ? "0 0 16px rgba(255,105,180,0.25)"
                  : "none",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <line x1="12" y1="7" x2="12" y2="11" />
                <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
                <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
              </svg>
              {autoPilot ? "AUTO-PILOT ON" : "Auto-Pilot"}
            </button>
          )}
        </div>

        {/* Game + Scoreboard layout */}
        <div
          style={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: "24px",
            alignItems: isSmall ? "center" : "flex-start",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Canvas outer — holds layout space correctly */}
          <div
            style={{
              width: `${CANVAS_SIZE}px`,
              height: `${scaledCanvasHeight}px`,
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              ref={wrapperRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${CANVAS_SIZE}px`,
                height: `${CANVAS_SIZE}px`,
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: autoPilot
                  ? "0 0 40px rgba(255,105,180,0.25), 0 0 80px rgba(255,105,180,0.08), inset 0 0 60px rgba(0,0,0,0.3)"
                  : "0 0 40px rgba(118,219,219,0.15), 0 0 80px rgba(118,219,219,0.05), inset 0 0 60px rgba(0,0,0,0.3)",
                border: autoPilot
                  ? "1px solid rgba(255,105,180,0.35)"
                  : "1px solid rgba(118,219,219,0.2)",
                transform: `scale(${canvasScale})`,
                transformOrigin: "top left",
                transition: "box-shadow 0.4s ease, border-color 0.4s ease",
              }}
            >
              {/* Scanlines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />

              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{
                  display: "block",
                  imageRendering: "pixelated",
                  touchAction: "none",
                }}
              />

              {/* AUTO-PILOT label overlay */}
              {autoPilot && gameState === "playing" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 20,
                    background: "rgba(255,105,180,0.18)",
                    border: "1px solid rgba(255,105,180,0.5)",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backdropFilter: "blur(4px)",
                    animation: "autoPilotPulse 2s ease-in-out infinite",
                  }}
                >
                  <style>{`
                    @keyframes autoPilotPulse {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.65; }
                    }
                  `}</style>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#ff69b4",
                      boxShadow: "0 0 6px #ff69b4",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      color: "#ff69b4",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "2px",
                      fontFamily: "var(--font-manrope), sans-serif",
                    }}
                  >
                    AUTO-PILOT
                  </span>
                </div>
              )}

              {/* Idle overlay */}
              {gameState === "idle" && (
                <div
                  onClick={startGame}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(26,15,40,0.85)",
                    zIndex: 5,
                    gap: "16px",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      color: "#76dbdb",
                      fontSize: "20px",
                      fontFamily: "var(--font-bitcount), monospace",
                      letterSpacing: "3px",
                      margin: 0,
                      textShadow: "0 0 20px rgba(118,219,219,0.4)",
                    }}
                  >
                    PIXEL SNAKE
                  </p>
                  <p
                    style={{
                      color: "rgba(118,219,219,0.5)",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      margin: 0,
                    }}
                  >
                    {isSmall
                      ? "Tap to start"
                      : "Press SPACE or ENTER to start"}
                  </p>
                  <p
                    style={{
                      color: "rgba(118,219,219,0.3)",
                      fontSize: "10px",
                      letterSpacing: "1px",
                      margin: 0,
                    }}
                  >
                    {isSmall
                      ? "Swipe to move"
                      : "Arrow Keys or WASD to move"}
                  </p>
                </div>
              )}

              {/* Paused overlay */}
              {gameState === "paused" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(26,15,40,0.92)",
                    backdropFilter: "blur(6px)",
                    zIndex: 5,
                    gap: "0px",
                    animation: "pauseFadeIn 0.25s ease",
                  }}
                >
                  <style>{`
                    @keyframes pauseFadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                    @keyframes pauseSlideIn {
                      from { opacity: 0; transform: translateY(12px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>

                  <p
                    style={{
                      color: "#76dbdb",
                      fontSize: "32px",
                      fontFamily: "var(--font-bitcount), monospace",
                      letterSpacing: "6px",
                      margin: "0 0 32px 0",
                      textShadow: "0 0 30px rgba(118,219,219,0.4)",
                      animation: "pauseSlideIn 0.3s ease 0.05s both",
                    }}
                  >
                    PAUSED
                  </p>

                  <button
                    onClick={togglePause}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      width: "200px",
                      padding: "14px 0",
                      borderRadius: "12px",
                      background: "rgba(118,219,219,0.1)",
                      border: "1px solid rgba(118,219,219,0.3)",
                      color: "#76dbdb",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      cursor: "pointer",
                      fontFamily: "var(--font-manrope), sans-serif",
                      transition: "all 0.25s ease",
                      marginBottom: "12px",
                      animation: "pauseSlideIn 0.3s ease 0.1s both",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(118,219,219,0.2)";
                      e.currentTarget.style.borderColor = "#76dbdb";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(118,219,219,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(118,219,219,0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(118,219,219,0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Play size={16} />
                    Resume
                  </button>

                  <button
                    onClick={() => {
                      pausedRef.current = false;
                      startGame();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      width: "200px",
                      padding: "14px 0",
                      borderRadius: "12px",
                      background: "rgba(247,80,130,0.08)",
                      border: "1px solid rgba(247,80,130,0.3)",
                      color: "#f75082",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      cursor: "pointer",
                      fontFamily: "var(--font-manrope), sans-serif",
                      transition: "all 0.25s ease",
                      marginBottom: "12px",
                      animation: "pauseSlideIn 0.3s ease 0.15s both",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(247,80,130,0.18)";
                      e.currentTarget.style.borderColor = "#f75082";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(247,80,130,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(247,80,130,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(247,80,130,0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Restart
                  </button>

                  <a
                    href="/"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      width: "200px",
                      padding: "14px 0",
                      borderRadius: "12px",
                      background: "transparent",
                      border: "1px solid rgba(118,219,219,0.12)",
                      color: "rgba(118,219,219,0.5)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      cursor: "pointer",
                      fontFamily: "var(--font-manrope), sans-serif",
                      transition: "all 0.25s ease",
                      textDecoration: "none",
                      animation: "pauseSlideIn 0.3s ease 0.2s both",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(118,219,219,0.3)";
                      e.currentTarget.style.color = "#76dbdb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(118,219,219,0.12)";
                      e.currentTarget.style.color = "rgba(118,219,219,0.5)";
                    }}
                  >
                    <ArrowLeft size={14} />
                    Back to Portfolio
                  </a>

                  {!isSmall && (
                    <p
                      style={{
                        color: "rgba(118,219,219,0.2)",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        marginTop: "24px",
                        animation: "pauseSlideIn 0.3s ease 0.25s both",
                      }}
                    >
                      Press ESC to resume
                    </p>
                  )}
                </div>
              )}

              {/* Game over overlay */}
              {gameState === "over" && (
                <div
                  onClick={startGame}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(26,15,40,0.88)",
                    zIndex: 5,
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      color: "#f75082",
                      fontSize: "24px",
                      fontFamily: "var(--font-bitcount), monospace",
                      letterSpacing: "4px",
                      margin: 0,
                      textShadow: "0 0 20px rgba(247,80,130,0.4)",
                    }}
                  >
                    GAME OVER
                  </p>
                  <p
                    style={{
                      color: "#76dbdb",
                      fontSize: "16px",
                      fontFamily: "var(--font-bitcount), monospace",
                      letterSpacing: "2px",
                      margin: 0,
                    }}
                  >
                    Score: {score}
                  </p>
                  {!wasAutoPilotRef.current &&
                    score >= allTimeBest &&
                    score > 0 && (
                      <p
                        style={{
                          color: "#f75082",
                          fontSize: "12px",
                          letterSpacing: "2px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          margin: 0,
                        }}
                      >
                        ★ New High Score! ★
                      </p>
                    )}
                  {wasAutoPilotRef.current && (
                    <p
                      style={{
                        color: "rgba(255,105,180,0.6)",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      Auto-Pilot — score not saved
                    </p>
                  )}
                  <p
                    style={{
                      color: "rgba(118,219,219,0.5)",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      margin: "8px 0 0 0",
                    }}
                  >
                    {isSmall
                      ? "Tap to retry"
                      : "Press SPACE or ENTER to retry"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Scoreboard */}
          <Scoreboard />
        </div>

        {/* Controls hint — desktop */}
        {!isSmall && (
          <span
            style={{
              color: "rgba(118,219,219,0.25)",
              fontSize: "11px",
              letterSpacing: "1px",
              textAlign: "center",
            }}
          >
            Arrow Keys / WASD to move · ESC to pause · P to toggle Auto-Pilot
          </span>
        )}

        {/* Controls hint — mobile */}
        {isSmall && (
          <p
            style={{
              color: "rgba(118,219,219,0.3)",
              fontSize: "11px",
              letterSpacing: "1px",
              textAlign: "center",
              margin: 0,
            }}
          >
            Swipe to move · Swipe overrides Auto-Pilot
          </p>
        )}

        {/* Footer */}
        <p
          style={{
            color: "rgba(118,219,219,0.2)",
            fontSize: "10px",
            letterSpacing: "1.5px",
            marginTop: "8px",
          }}
        >
          [F]elina • ARCADE
        </p>
      </div>
    </main>
  );
}