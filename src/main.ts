import './style.css';
import './styles/cursor.css';
import './styles/toolbar.css';
import './styles/upload-image.css';

import { UploadImageScreen } from './screens/upload-image-screen';
import UIContainer from './services/ui-container';

UIContainer.add(new UploadImageScreen(UIContainer.root)).render();
