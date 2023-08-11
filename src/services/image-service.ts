import { Canvas, Toolbar, ColorDropper } from '../screens/canvas-screen';

import { UploadImageScreen } from '../screens/upload-image-screen/upload-image-screen';
import UIContainer from './ui-container';

export class ImageService {
  static upload(file: File) {
    if (UIContainer.get('Canvas')) {
      const canvas = UIContainer.get<Canvas>('Canvas')!;
      canvas.img = file;
    }
  
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
