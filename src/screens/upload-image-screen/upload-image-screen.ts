import UIContainer from '../../services/ui-container';
import { ImageService } from '../../services/image-service';
import { AppElement, InteractiveAppElement } from '../../types';

import { UploadImageInputContainer } from './components/upload-image-input';

export class UploadImageScreen
  implements InteractiveAppElement<HTMLDivElement>
{
  element: HTMLDivElement;
  parent: Node;
  children: AppElement;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.element.id = 'upload-image';
    this.children = new UploadImageInputContainer(this.element);
    this.setupEvents();
  }

  remove(): void {
    this.parent.removeChild(this.element);
    UIContainer.remove(this.constructor.name);
  }

  setupEvents(): void {
    this.element.ondrop = (event) => {
      event.preventDefault();

      if (event.dataTransfer?.files) {
        const [firstFile] = event.dataTransfer.files;

        ImageService.upload(firstFile);
      }
    };
    this.element.ondragover = (event) => {
      event.preventDefault();
    };
  }

  render() {
    this.children.render();
    this.parent.appendChild(this.element);
  }
}
