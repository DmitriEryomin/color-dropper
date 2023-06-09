import { canvasMaxHeight, canvasMaxWidth } from '../state/constants';
import { state } from '../state';

function getOffsets(width: number, height: number, scale: number) {
  return {
    xOffset: width / 2 / scale,
    yOffset: height / 2 / scale,
  };
}

export function drawMagnifier(x: number, y: number) {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const magnifier = document.querySelector<HTMLCanvasElement>('.magnifier')!;
  const context = magnifier.getContext('2d')!;

  if (!state.img) {
    return;
  }

  context.clearRect(0, 0, magnifier.width, magnifier.height);

  const { img } = state;

  const scaleX = img.width / canvas.width;
  const scaleY = img.height / canvas.height;

  const scale = Math.min(scaleX, scaleY);
  const magnifierScale = scale < 2 ? 2 : 2 / scale;
  const { xOffset, yOffset } = getOffsets(
    magnifier.width,
    magnifier.height,
    magnifierScale
  );

  const isImgBiggerThanCanvas =
    img.width > canvasMaxWidth || img.height > canvasMaxHeight;
  const sx = isImgBiggerThanCanvas ? x * scaleX - xOffset : x - xOffset;
  const sy = isImgBiggerThanCanvas ? y * scaleY - yOffset : y - yOffset;

  context.drawImage(
    img,
    sx,
    sy,
    img.width,
    img.height,
    0,
    0,
    img.width * magnifierScale,
    img.height * magnifierScale
  );
}
