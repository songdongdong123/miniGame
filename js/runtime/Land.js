/*
 * @Author: Ethan 
 * @Date: 2018-12-20 12:07:04 
 * @Last Modified by: Ethan
 * @Last Modified time: 2018-12-20 17:05:42
 */

import { Sprite } from "../base/Sprite";
import { Director } from "../Director";
import { DataStore } from "../base/DateStore";

// 不断移动陆地类
export class Land extends Sprite {
  constructor () {
    const image = Sprite.getImage('land');
    super(image,0,0,
          image.width, image.height, 
          0, DataStore.getInstance().canvas.height-image.height,
          image.width, image.height
      );
    // 地板的水平变化坐标
    this.landX = 0;
    // 地板的移动速度
    this.landSpeed = Director.getInstance().moveSpeed;
  }
  draw () {
    this.landX = this.landX + this.landSpeed;
    if (this.landX > (this.img.width - DataStore.getInstance().canvas.width)) {
      this.landX = 0;
    }
    super.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height
    )
  }
}