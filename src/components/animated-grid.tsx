"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const squareSize = 60;
    const borderColor = "rgba(59, 130, 246, 0.12)";
    const hoverFillColor = "rgba(59, 130, 246, 0.2)";
    const speed = 0.6;

    const gridOffset = { x: 0, y: 0 };
    let mouseX = -1;
    let mouseY = -1;
    let animationId: number | null = null;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const problemSection = document.getElementById('problem');
      const canvasHeight = problemSection
        ? problemSection.offsetTop + problemSection.offsetHeight
        : window.innerHeight * 2;

      canvas.width = window.innerWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset before scaling — prevents compound scaling bug
      ctx.scale(dpr, dpr);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    };

    resizeCanvas();
    window.addEventListener("resize", debouncedResize);

    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          animationId = requestAnimationFrame(drawGrid);
        }
      },
      { threshold: 0 }
    );

    visibilityObserver.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const drawGrid = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      const width = parseInt(canvas.style.width) || window.innerWidth;
      const height = parseInt(canvas.style.height) || window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use modulo so the offset always wraps between 0 and squareSize
      const offsetX = gridOffset.x % squareSize;
      const offsetY = gridOffset.y % squareSize;

      ctx.lineWidth = 0.5;

      // Always start from before the viewport and fill past it
      for (let x = -offsetX - squareSize; x < width + squareSize; x += squareSize) {
        for (let y = -offsetY - squareSize; y < height + squareSize; y += squareSize) {
          const isHovered =
            mouseX >= 0 &&
            mouseY >= 0 &&
            mouseX >= x &&
            mouseX < x + squareSize &&
            mouseY >= y &&
            mouseY < y + squareSize;

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      gridOffset.x += speed * 0.3;
      gridOffset.y += speed * 0.15;

      animationId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
