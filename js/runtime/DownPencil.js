import { Pencil } from "./Pencil";
import { DataStore } from '../base/DateStore';
import { Sprite } from "../base/Sprite";

// 下半部分铅笔
export class DownPencil extends Pencil {
  constructor (top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top);
  }
  draw () {
    let gap = DataStore.getInstance().canvas.height / 5; // 上下铅笔的间距
    this.y = this.top + gap;
    super.draw()
  }
}