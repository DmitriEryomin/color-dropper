import { canvasMaxHeight, canvasMaxWidth } from '../state/constants';
import { state } from '../state';

export function drawImage(file: File): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const reader = new FileReader();
  const img = new Image();
  const context = canvas.getContext('2d')!;

  reader.readAsDataURL(file);
  reader.onload = (event) => {
    if (event.target?.result) {
      img.src = event.target.result as string;
    }
  };

  img.onload = () => {
    state.setImage(img);

    if (img.width > canvasMaxWidth || img.height > canvasMaxHeight) {
      const scaleX = canvasMaxWidth / img.width;
      const scaleY = canvasMaxHeight / img.height;
      const scale = Math.min(scaleX, scaleY);

      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, imgWidth, imgHeight);
      return;
    }

    canvas.width = img.width;
    canvas.height = img.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}
