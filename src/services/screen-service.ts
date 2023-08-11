import { Canvas, ColorDropper, Toolbar } from '../screens/canvas-screen';
import { UploadImageScreen } from '../screens/upload-image-screen';
import UIContainer from './ui-container';

export class ScreenService {
  static initializeImageUpload() {
    UIContainer.add(new UploadImageScreen(UIContainer.root)).render();
  }

  static initializeCanvas(file: File) {
    const element = UIContainer.get<UploadImageScreen>('UploadImageScreen')!;
    element.remove();

    const toolbar = UIContainer.add(new Toolbar(UIContainer.root));
    toolbar.render();
    const canvas = UIContainer.add(new Canvas(UIContainer.root));
    canvas.img = file;
    canvas.render();
    UIContainer.add(new ColorDropper(UIContainer.root));
  }
}
