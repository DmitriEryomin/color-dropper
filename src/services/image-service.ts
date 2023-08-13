import { Canvas } from '../screens/canvas-screen';

import UIContainer from './ui-container';

export class ImageService {
  static upload(file: File) {
    if (UIContainer.get('Canvas')) {
      const canvas = UIContainer.get<Canvas>('Canvas')!;
      canvas.img = file;
    }
  }
}
