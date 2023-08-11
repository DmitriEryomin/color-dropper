import { AppElement } from '../../../types';

export class ColorValue implements AppElement<HTMLSpanElement> {
  element: HTMLSpanElement;
  parent: Node;
  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('span');
    this.element.textContent = '#000000';
    this.element.classList.add('toolbar-color_value');
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
