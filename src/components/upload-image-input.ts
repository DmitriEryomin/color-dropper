import { ImageService } from '../services/image-service';
import { InteractiveAppElement } from '../types';

export class UploadImageInput
  implements InteractiveAppElement<HTMLInputElement>
{
  element: HTMLInputElement;
  parent: Node;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('input');
    this.element.type = 'file';
    this.setupEvents();
  }

  setupEvents(): void {
    this.element.onchange = (event) => {
      const [firstFile] = (event.target as HTMLInputElement).files!;

      // TODO change this
      ImageService.upload(firstFile);
    };
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
