import { drawImage } from '../services/draw-image';
import { renderToolbar } from './toolbar';
import { renderCanvas } from './canvas';

function handleImageUpload(file: File) {
  const rootElement = document.querySelector<HTMLDivElement>('#app')!;
  const uploadImage = document.querySelector<HTMLDivElement>('#upload-image')!;

  rootElement.removeChild(uploadImage);

  renderToolbar(rootElement);
  renderCanvas(rootElement);
  drawImage(file);
}

function renderInput() {
  const container = document.createElement('div');
  container.id = 'upload-image-input';
  container.textContent = 'Drag files here or press Upload';

  const label = document.createElement('label');
  label.textContent = 'Upload';

  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (event) => {
    const [firstFile] = (event.target as HTMLInputElement).files!;

    handleImageUpload(firstFile);
  };

  label.appendChild(input);
  container.appendChild(label);

  return container;
}

export function renderUploadImage(rootElement: HTMLElement): void {
  const uploadImage = document.createElement('div');

  uploadImage.id = 'upload-image';
  uploadImage.ondrop = (event) => {
    event.preventDefault();

    if (event.dataTransfer?.files) {
      const [firstFile] = event.dataTransfer.files;

      handleImageUpload(firstFile);
    }
  };
  uploadImage.ondragover = (event) => {
    event.preventDefault();
  };

  uploadImage.appendChild(renderInput());

  rootElement.appendChild(uploadImage);
}
