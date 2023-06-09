import './style.css';
import './styles/cursor.css';
import './styles/toolbar.css';
import './styles/upload-image.css';

import { renderUploadImage } from './components/upload-image';

renderUploadImage(document.querySelector<HTMLDivElement>('#app')!);
