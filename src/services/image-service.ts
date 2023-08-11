import { drawImage } from './draw-image';
import { renderToolbar } from '../components/toolbar';
import { renderCanvas } from '../components/canvas';

import { UploadImageScreen } from '../screens/upload-image-screen/upload-image-screen';
import UIContainer from './ui-container';

export class ImageService {
  static upload(file: File) {
    const element = UIContainer.get<UploadImageScreen>('UploadImageScreen');
    element.remove();

    // TODO
    const rootElement = document.querySelector<HTMLDivElement>('#app')!;
    renderToolbar(rootElement);
    renderCanvas(rootElement);
    drawImage(file);
  }
}
