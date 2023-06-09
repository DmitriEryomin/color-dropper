interface State {
  dropperMode: boolean;
  img: null | HTMLImageElement;
  toggleDropperMode: () => void;
  setImage: (img: HTMLImageElement) => void;
}

export const state: State = {
  dropperMode: false,
  img: null,
  toggleDropperMode() {
    this.dropperMode = !this.dropperMode;
  },
  setImage(img) {
    this.img = img;
  },
};
