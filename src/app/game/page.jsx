"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

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

export default function GamePage() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const speedRef = useRef(INITIAL_SPEED);
  const loopRef = useRef(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("snake-high-score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Save high score
  const saveHighScore = useCallback(
    (s) => {
      if (s > highScore) {
        setHighScore(s);
        localStorage.setItem("snake-high-score", s.toString());
      }
    },
    [highScore]
  );

  // Draw
  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#1a0f28";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid dots
    ctx.fillStyle = "rgba(118,219,219,0.06)";
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        ctx.fillRect(x * CELL_SIZE + CELL_SIZE / 2 - 1, y * CELL_SIZE + CELL_SIZE / 2 - 1, 2, 2);
      }
    }
    // Walls
ctx.fillStyle = "rgba(118,219,219,0.25)";
// Top wall
ctx.fillRect(0, 0, CANVAS_SIZE, 2);
// Bottom wall
ctx.fillRect(0, CANVAS_SIZE - 2, CANVAS_SIZE, 2);
// Left wall
ctx.fillRect(0, 0, 2, CANVAS_SIZE);
// Right wall
ctx.fillRect(CANVAS_SIZE - 2, 0, 2, CANVAS_SIZE);

    // Food
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

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "#76dbdb" : "rgba(118,219,219,0.6)";
      if (isHead) {
        ctx.shadowColor = "#76dbdb";
        ctx.shadowBlur = 10;
      }
      ctx.fillRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      if (isHead) {
        ctx.shadowBlur = 0;
      }
    });
  }, []);

  // Game tick
  const tick = useCallback(() => {
    const snake = snakeRef.current;
    dirRef.current = nextDirRef.current;
    const dir = dirRef.current;
    const head = snake[0];

    const newHead = {
  x: head.x + dir.x,
  y: head.y + dir.y,
};

// Wall collision
if (
  newHead.x < 0 ||
  newHead.x >= GRID_SIZE ||
  newHead.y < 0 ||
  newHead.y >= GRID_SIZE
) {
  setGameState("over");
  saveHighScore(scoreRef.current);
  if (loopRef.current) clearInterval(loopRef.current);
  return;
}
    // Self collision
    if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      setGameState("over");
      saveHighScore(scoreRef.current);
      if (loopRef.current) clearInterval(loopRef.current);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Eat food
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = getRandomFood(newSnake);

      // Speed up
      if (speedRef.current > 60) {
        speedRef.current = Math.max(60, speedRef.current - SPEED_INCREMENT);
        if (loopRef.current) clearInterval(loopRef.current);
        loopRef.current = setInterval(() => {
          tick();
        }, speedRef.current);
      }
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    draw();
  }, [draw, saveHighScore]);

  // Start game
  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = getRandomFood([{ x: 10, y: 10 }]);
    scoreRef.current = 0;
    speedRef.current = INITIAL_SPEED;
    setScore(0);
    setGameState("playing");
    draw();

    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = setInterval(() => {
      tick();
    }, speedRef.current);
  }, [draw, tick]);

  // Keyboard input
  useEffect(() => {
    const handleKey = (e) => {
      if (DIRECTIONS[e.key]) {
        e.preventDefault();
        const newDir = DIRECTIONS[e.key];
        const curDir = dirRef.current;

        // Prevent reversing
        if (newDir.x + curDir.x === 0 && newDir.y + curDir.y === 0) return;

        nextDirRef.current = newDir;
      }

      // Space or Enter to start/restart
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (gameState !== "playing") {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, startGame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#271a38",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
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
          gap: "24px",
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
            marginBottom: "8px",
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
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
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
              fontSize: "48px",
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

        {/* Score display */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
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
                color: "#76dbdb",
                fontFamily: "var(--font-bitcount), monospace",
              }}
            >
              {score}
            </p>
          </div>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "rgba(118,219,219,0.15)",
            }}
          />
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
              Best
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 800,
                color: "#f75082",
                fontFamily: "var(--font-bitcount), monospace",
              }}
            >
              {highScore}
            </p>
          </div>
        </div>

        {/* Canvas wrapper — CRT glow effect */}
        <div
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow:
              "0 0 40px rgba(118,219,219,0.15), 0 0 80px rgba(118,219,219,0.05), inset 0 0 60px rgba(0,0,0,0.3)",
            border: "1px solid rgba(118,219,219,0.2)",
          }}
        >
          {/* CRT scanlines overlay */}
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
            }}
          />

          {/* Idle overlay */}
          {gameState === "idle" && (
            <div
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
                Press SPACE or ENTER to start
              </p>
              <p
                style={{
                  color: "rgba(118,219,219,0.3)",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                Arrow Keys or WASD to move
              </p>
            </div>
          )}

          {/* Game over overlay */}
          {gameState === "over" && (
            <div
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
              {score >= highScore && score > 0 && (
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
              <p
                style={{
                  color: "rgba(118,219,219,0.5)",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  margin: "8px 0 0 0",
                }}
              >
                Press SPACE or ENTER to retry
              </p>
            </div>
          )}
        </div>

        {/* Controls hint */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          {["W", "A", "S", "D"].map((key) => (
            <div
              key={key}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                border: "1px solid rgba(118,219,219,0.2)",
                background: "rgba(118,219,219,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(118,219,219,0.4)",
                fontFamily: "monospace",
              }}
            >
              {key}
            </div>
          ))}
          <span
            style={{
              color: "rgba(118,219,219,0.25)",
              fontSize: "11px",
              letterSpacing: "0.5px",
            }}
          >
            or Arrow Keys
          </span>
        </div>

        {/* Footer credit */}
        <p
          style={{
            color: "rgba(118,219,219,0.2)",
            fontSize: "10px",
            letterSpacing: "1.5px",
            marginTop: "16px",
          }}
        >
          [F]elina • ARCADE
        </p>
      </div>
    </main>
  );
}