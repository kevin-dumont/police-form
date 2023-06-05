import React, { useRef, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

interface SignatureFieldProps {
  onChange: (value: string) => void;
  width: number;
  height: number;
}

const SignatureField: React.FC<SignatureFieldProps> = ({
  onChange,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    const handleStart = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      isDrawingRef.current = true;
      const { clientX, clientY } = getEventCoordinates(event);
      lastPositionRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawingRef.current) return;

      const { clientX, clientY } = getEventCoordinates(event);
      const { x: lastX, y: lastY } = lastPositionRef.current;

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(clientX, clientY);
      context.stroke();

      lastPositionRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
      const signatureData = canvas.toDataURL("image/png");
      onChange(signatureData);
    };

    const getEventCoordinates = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0,
        clientY = 0;

      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }

      return {
        clientX: (clientX - rect.left) * (canvas.width / rect.width),
        clientY: (clientY - rect.top) * (canvas.height / rect.height),
      };
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseout", handleEnd);
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseout", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [onChange]);

  const handleClear = () => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  return (
    <Box
      width={width}
      height={height}
      background="gray.100"
      borderRadius="xl"
      position="relative"
    >
      <canvas ref={canvasRef} width={width} height={height} />
      <Button
        position="absolute"
        top={2}
        right={2}
        onClick={handleClear}
        size="xs"
        leftIcon={<RepeatIcon />}
        colorScheme="blackAlpha"
      >
        Effacer
      </Button>
    </Box>
  );
};

export default SignatureField;
