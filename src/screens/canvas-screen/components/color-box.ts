import { AppElement } from '../../../types';

export class ColorBox implements AppElement<HTMLSpanElement> {
  element: HTMLSpanElement;
  parent: Node;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('span');
    this.element.classList.add('toolbar-color_box');
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
