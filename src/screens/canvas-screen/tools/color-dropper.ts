import rgbHex from 'rgb-hex';

import { AppElement } from '../../../types';
import { canvasMaxHeight, canvasMaxWidth } from '../../../state/constants';

const cursorSize = parseInt(
  getComputedStyle(document.body).getPropertyValue('--cursor-size')
);

function getOffsets(width: number, height: number, scale: number) {
  return {
    xOffset: width / 2 / scale,
    yOffset: height / 2 / scale,
  };
}

export class ColorDropper implements AppElement<HTMLSpanElement> {
  element: HTMLSpanElement;
  parent: Node;
  children: [ColorDropperText, ColorDropperMagnifier];

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('span');
    this.element.classList.add('cursor');
    this.children = [
      new ColorDropperText(this.element),
      new ColorDropperMagnifier(this.element),
    ];
  }
  render(): void {
    this.children.forEach((children) => {
      children.render();
    });
    this.parent.appendChild(this.element);
  }
  remove(): void {
    this.parent.removeChild(this.element);
  }
  move(event: MouseEvent, [red, green, blue]: Uint8ClampedArray): void {
    const translateX = event.clientX - cursorSize / 2;
    const translateY = event.clientY - cursorSize / 2;
    this.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    this.element.style.boxShadow = `0 0 0 8px #${rgbHex(red, green, blue)}`;
    this.children[0].element.textContent = `#${rgbHex(red, green, blue)}`;
  }
  drawMagnifier(img: HTMLImageElement, x: number, y: number, w: number, h: number) {
    const magnifier = this.children[1].element;
    const context = magnifier.getContext('2d')!;
    const scaleX = img.width / w;
    const scaleY = img.height / h;

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
}

class ColorDropperMagnifier implements AppElement<HTMLCanvasElement> {
  element: HTMLCanvasElement;
  parent: Node;
  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('canvas');
    this.element.classList.add('magnifier');

    this.element.width = cursorSize;
    this.element.height = cursorSize;
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}

class ColorDropperText implements AppElement<HTMLSpanElement> {
  element: HTMLSpanElement;
  parent: Node;
  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('span');
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
