import { state } from '../../../state';
import { InteractiveAppElement } from '../../../types';
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
      state.toggleDropperMode();
      this.element.classList.toggle('toggle-mode');

      // TODO
      const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
      canvas.classList.toggle('custom-cursor');
    };
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
