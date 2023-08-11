import { AppElement } from '../types';

class UIContainer {
  root: HTMLDivElement;
  elements: AppElement[];

  constructor() {
    this.elements = [];
    this.root = document.querySelector<HTMLDivElement>('#app')!
  }

  add<T extends AppElement>(element: T) {
    this.elements.push(element);
    return element;
  }

  get<T = AppElement>(constructorName: string): T | undefined {
    return this.elements.find((el) => el.constructor.name === constructorName) as T;
  }

  remove(constructorName: string) {
    this.elements = this.elements.filter(el => el.constructor.name === constructorName);
  }
}

const uiContainer = new UIContainer();
export default uiContainer;
