import rgbHex from 'rgb-hex';

import { state } from '../state';
import { renderCursor } from './cursor';

export function renderCanvas(rootElement: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';

  canvas.onclick = (event) => {
    if (!state.dropperMode) {
      return;
    }

    const context = canvas.getContext('2d')!;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    const [red, green, blue] = context.getImageData(x, y, 1, 1).data;

    const colorValue = document.querySelector<HTMLSpanElement>(
      '.toolbar-color_value'
    )!;
    const colorBox =
      document.querySelector<HTMLSpanElement>('.toolbar-color_box')!;

    const hex = rgbHex(red, green, blue);

    colorValue.textContent = `#${hex}`;
    colorBox.style.backgroundColor = `#${hex}`;
  };

  rootElement.appendChild(canvas);
  renderCursor(rootElement);
}
