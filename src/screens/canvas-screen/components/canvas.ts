import rgbHex from 'rgb-hex';

import { InteractiveAppElement } from '../../../types';
import UIContainer from '../../../services/ui-container';
import { canvasMaxHeight, canvasMaxWidth } from '../../../state/constants';

import type { ColorDropper } from '../tools/color-dropper';
import type { Toolbar } from './toolbar';

export class Canvas implements InteractiveAppElement<HTMLCanvasElement> {
  element: HTMLCanvasElement;
  parent: Node;
  #img: HTMLImageElement;
  #dropperMode: boolean = false;

  get img(): HTMLImageElement {
    return this.#img;
  }

  set img(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      if (event.target?.result) {
        this.#img.src = event.target.result as string;
        this.#img.onload = () => {
          this.#drawImage();
        };
      }
    };
  }

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('canvas');
    this.element.id = 'canvas';
    this.#img = new Image();
    this.setupEvents();
  }

  #drawImage() {
    const context = this.element.getContext('2d')!;
    if (this.img.width > canvasMaxWidth || this.img.height > canvasMaxHeight) {
      const scaleX = canvasMaxWidth / this.img.width;
      const scaleY = canvasMaxHeight / this.img.height;
      const scale = Math.min(scaleX, scaleY);

      const imgWidth = this.img.width * scale;
      const imgHeight = this.img.height * scale;

      this.element.width = imgWidth;
      this.element.height = imgHeight;
      context.clearRect(0, 0, this.element.width, this.element.height);
      context.drawImage(this.img, 0, 0, imgWidth, imgHeight);
      return;
    }

    this.element.width = this.img.width;
    this.element.height = this.img.height;
    context.clearRect(0, 0, this.element.width, this.element.height);
    context.drawImage(this.img, 0, 0, this.element.width, this.element.height);
  }

  toggleDropperMode(): void {
    this.#dropperMode = !this.#dropperMode;
    this.element.classList.toggle('custom-cursor');
  }

  setupEvents(): void {
    this.element.onclick = (event) => {
      if (!this.#dropperMode) {
        return;
      }

      const context = this.element.getContext('2d')!;
      const x = event.clientX - this.element.offsetLeft;
      const y = event.clientY - this.element.offsetTop;
      const [red, green, blue] = context.getImageData(x, y, 1, 1).data;
      const hex = rgbHex(red, green, blue);
      const toolbar = UIContainer.get<Toolbar>('Toolbar');
      toolbar?.changeSelectedColor(hex);
    }

    this.element.onmouseover = () => {
      if (this.#dropperMode) {
        UIContainer.get<ColorDropper>('ColorDropper')?.render();
      }
    };

    this.element.onmousemove = (event) => {
      if (!this.#dropperMode) {
        return;
      }
      const cursor = UIContainer.get<ColorDropper>('ColorDropper');
      if (!cursor) {
        return;
      }
      const context = this.element.getContext('2d')!;
      const x = event.clientX - this.element.offsetLeft;
      const y = event.clientY - this.element.offsetTop;
      cursor.move(event, context.getImageData(x, y, 1, 1).data);
      cursor.drawMagnifier(
        this.img,
        x,
        y,
        this.element.width,
        this.element.height
      );
    };

    this.element.onmouseout = () => {
      if (this.#dropperMode) {
        UIContainer.get<ColorDropper>('ColorDropper')?.remove();
      }
    };
  }

  render(): void {
    this.parent.appendChild(this.element);
  }
}
