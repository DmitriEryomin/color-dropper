import rgbHex from 'rgb-hex';

import { drawMagnifier } from '../services/draw-magnifier';
import { state } from '../state';

const cursorSize = parseInt(
  getComputedStyle(document.body).getPropertyValue('--cursor-size')
);

function renderMagnifier() {
  const magnifier = document.createElement('canvas');
  magnifier.classList.add('magnifier');

  magnifier.width = cursorSize;
  magnifier.height = cursorSize;

  return magnifier;
}

export function renderCursor(rootElement: HTMLElement) {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const context = canvas.getContext('2d')!;
  const cursor = document.createElement('span');
  const color = document.createElement('span');
  cursor.appendChild(color);
  cursor.appendChild(renderMagnifier());
  cursor.classList.add('cursor');

  canvas.onmousemove = (event) => {
    if (!state.dropperMode) {
      return;
    }
    const translateX = event.clientX - cursorSize / 2;
    const translateY = event.clientY - cursorSize / 2;
    cursor.style.transform = `translate(${translateX}px, ${translateY}px)`;
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    drawMagnifier(x, y);

    const [red, green, blue] = context.getImageData(x, y, 1, 1).data;
    color.textContent = `#${rgbHex(red, green, blue)}`;
    cursor.style.boxShadow = `0 0 0 8px #${rgbHex(red, green, blue)}`;
  };
  canvas.onmouseover = () => {
    if (state.dropperMode) {
      rootElement.appendChild(cursor);
    }
  };
  canvas.onmouseout = () => {
    if (state.dropperMode) {
      rootElement.removeChild(cursor);
    }
  };
}
