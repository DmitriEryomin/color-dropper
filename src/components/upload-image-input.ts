import { InteractiveAppElement } from '../types';

export class UploadImageInput
  implements InteractiveAppElement<HTMLInputElement>
{
  element: HTMLInputElement;
  parent: Node;

  constructor(parent: Node, effect: (file: File) => void) {
    this.parent = parent;
    this.element = document.createElement('input');
    this.element.type = 'file';
    this.setupEvents(effect);
  }

  setupEvents(effect: (file: File) => void): void {
    this.element.onchange = (event) => {
      const [firstFile] = (event.target as HTMLInputElement).files!;

      effect(firstFile);
    };
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
