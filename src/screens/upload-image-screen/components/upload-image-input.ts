import { ImageService } from '../../../services/image-service';
import { AppElement, InteractiveAppElement } from '../../../types';

export class UploadImageInputContainer implements AppElement<HTMLDivElement> {
  element: HTMLDivElement;
  parent: Node;
  children: AppElement;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.children = new UploadImageInputLabel(this.element);
    this.element.id = 'upload-image-input';
    this.element.textContent = 'Drag files here or press Upload';
  }
  render(): void {
    this.children.render();
    this.parent.appendChild(this.element);
  }
}

class UploadImageInputLabel implements AppElement<HTMLLabelElement> {
  element: HTMLLabelElement;
  parent: Node;
  children: AppElement;
  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('label');
    this.element.textContent = 'Upload';
    this.children = new UploadImageInput(this.element);
  }
  render(): void {
    this.children.render();
    this.parent.appendChild(this.element);
  }
}

class UploadImageInput implements InteractiveAppElement<HTMLInputElement> {
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

      ImageService.upload(firstFile);
    };
  }
  render(): void {
    this.parent.appendChild(this.element);
  }
}
