import uploadIcon from '../assets/file-upload.svg';
import colorPickerIcon from '../assets/color-picker.svg';

import { drawImage } from '../services/draw-image';
import { state } from '../state';

function uploadInput() {
  const label = document.createElement('label');
  label.classList.add('toolbar-upload_image');

  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (event) => {
    const [firstFile] = (event.target as HTMLInputElement).files!;

    drawImage(firstFile);
  };

  label.innerHTML = `<img width="16px" height="16px" src="${uploadIcon}" />`;
  label.appendChild(input);

  return label;
}

function dropper() {
  const button = document.createElement('button');
  button.classList.add('toolbar-dropper');
  button.innerHTML = `<img width="16px" height="16px" src="${colorPickerIcon}" />`;
  button.onclick = () => {
    state.toggleDropperMode();
    button.classList.toggle('toggle-mode');

    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    canvas.classList.toggle('custom-cursor');
  };

  return button;
}

function colorBox() {
  const span = document.createElement('span');
  span.classList.add('toolbar-color_box');

  return span;
}

function colorValue() {
  const span = document.createElement('span');
  span.classList.add('toolbar-color_value');
  span.textContent = '#000000';

  return span;
}

export function renderToolbar(rootElement: HTMLElement) {
  const container = document.createElement('div');
  container.classList.add('toolbar');

  container.appendChild(dropper());
  container.appendChild(uploadInput());
  container.appendChild(colorBox());
  container.appendChild(colorValue());

  rootElement.appendChild(container);
}
