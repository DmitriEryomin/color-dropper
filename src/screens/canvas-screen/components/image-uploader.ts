import { AppElement, InteractiveAppElement } from '../../../types';
import { UploadImageInput } from '../../../components/upload-image-input';

import uploadIcon from '../../../assets/file-upload.svg';

export class ImageUploader implements AppElement<HTMLLabelElement> {
  element: HTMLLabelElement;
  parent: Node;
  children: InteractiveAppElement<HTMLInputElement>;

  constructor(parent: Node) {
    this.parent = parent;
    this.element = document.createElement('label');
    this.element.classList.add('toolbar-upload_image');
    this.children = new UploadImageInput(this.element);
  }
  render(): void {
    this.element.innerHTML = `<img width="16px" height="16px" src="${uploadIcon}" />`;
    this.children.render();
    this.parent.appendChild(this.element);
  }
}
