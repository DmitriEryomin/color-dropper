import { AppElement } from '../types';

class UIContainer {
  elements: AppElement[];

  constructor() {
    this.elements = [];
  }

  add(element: AppElement) {
    this.elements.push(element);
  }

  get<T = AppElement>(constructorName: string): T {
    return this.elements.find((el) => el.constructor.name === constructorName) as T;
  }

  remove(constructorName: string) {
    this.elements.filter(el => el.constructor.name === constructorName);
  }
}

const uiContainer = new UIContainer();
export default uiContainer;
