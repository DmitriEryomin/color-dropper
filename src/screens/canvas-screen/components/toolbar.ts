import { AppElement } from '../../../types';
import { ColorBox } from './color-box';
import { ColorValue } from './color-value';

import { Dropper } from './dropper';
import { ImageUploader } from './image-uploader';

export class Toolbar implements AppElement<HTMLDivElement> {
  element: HTMLDivElement;
  parent: Node;
  children: AppElement[];

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.element.classList.add('toolbar');
    this.children = [
      new Dropper(this.element),
      new ImageUploader(this.element),
      new ColorBox(this.element),
      new ColorValue(this.element),
    ];
  }

  render(): void {
    this.children.forEach((children) => {
      children.render();
    });
    this.parent.appendChild(this.element);
  }

  changeSelectedColor(hex: string) {
    const colorBox = (this.children[2] as ColorBox).element;
    const colorValue = (this.children[3] as ColorValue).element;

    colorValue.textContent = `#${hex}`;
    colorBox.style.backgroundColor = `#${hex}`;
  }
}
