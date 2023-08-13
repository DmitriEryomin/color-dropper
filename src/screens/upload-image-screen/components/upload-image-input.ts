import { AppElement } from '../../../types';
import { ScreenService } from '../../../services/screen-service';
import { UploadImageInput } from '../../../components/upload-image-input';

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
    this.children = new UploadImageInput(this.element, ScreenService.initializeCanvas);
  }
  render(): void {
    this.children.render();
    this.parent.appendChild(this.element);
  }
}
