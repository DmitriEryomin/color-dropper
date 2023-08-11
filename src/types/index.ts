export interface AppElement<T = Node> {
  element: T;
  parent: Node;
  render(): void;
  remove?(): void;
}

export interface InteractiveAppElement<T extends Node> extends AppElement<T> {
  setupEvents(): void;
}