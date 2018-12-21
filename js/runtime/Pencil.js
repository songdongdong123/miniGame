import { Sprite } from "../base/Sprite";
import { DataStore } from '../base/DateStore';

/*
 * @Author: Ethan 
 * @Date: 2018-12-20 12:07:24 
 * @Last Modified by: Ethan
 * @Last Modified time: 2018-12-20 17:06:39
 * @Pencil基类
 */
export class Pencil extends Sprite{
  constructor (image, top) {
    super(image,
      0,0,
      image.width, image.height,
      // 刚好在右侧看不见的位置
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height
      );
    this.top = top;
    this.moveSpeed = 2;
  }
  draw () {
    this.x -= this.moveSpeed;
    super.draw(
      this.img,
      0,0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )
  }
}