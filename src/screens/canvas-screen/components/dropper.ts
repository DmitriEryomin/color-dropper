import { Canvas } from './canvas';
import { InteractiveAppElement } from '../../../types';
import UIContainer from '../../../services/ui-container';

import colorPickerIcon from '../../../assets/color-picker.svg';

export class Dropper implements InteractiveAppElement<HTMLButtonElement> {
  element: HTMLButtonElement;
  parent: Node;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('button');
    this.element.classList.add('toolbar-dropper');
    this.element.innerHTML = `<img width="16px" height="16px" src="${colorPickerIcon}" />`;
    this.setupEvents();
  }
  setupEvents(): void {
    this.element.onclick = () => {
      this.element.classList.toggle('toggle-mode');

      UIContainer.get<Canvas>('Canvas')?.toggleDropperMode();
    };
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
