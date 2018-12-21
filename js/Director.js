import { DataStore } from "./base/DateStore";
import { UpPencil } from './runtime/UpPencil';
import { DownPencil } from './runtime/DownPencil';

// 导演类，控制游戏的逻辑
export class Director {
  constructor () {
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
  }
  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
  createPencil () {
     const minTop = DataStore.getInstance().canvas.height / 8;
     const maxTop = DataStore.getInstance().canvas.height / 2;
     const top = minTop + Math.random() * (maxTop - minTop);
     this.dataStore.get('pencils').push(new UpPencil(top));
     this.dataStore.get('pencils').push(new DownPencil(top));
  }
  birdsEvent () {
    // if (this)
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }

  static isStrike (bird, pencil) {
    // 小鸟和铅笔撞击判断
    let s = false;
    if (bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.right < pencil.left ||
      bird.left > pencil.right) {
        s = true
      }
      return !s;
  }

  check () {
    // 撞击判断
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');
    // 地板的撞击判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true;
      return;
    }

    // 小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }
    const length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }

      if (Director.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true;
        return;
      }
    }

    // 加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    }

  }
  run () {
    this.check();
    if (!this.isGameOver) {
      // 初始化背景类
      this.dataStore.get('background').draw();

      const pencils = this.dataStore.get('pencils');
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift();
        pencils.shift();
        this.dataStore.get('score').isScore = true;
      }

      if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width)/2 && pencils.length === 2) {
        this.createPencil();
      }

      this.dataStore.get('pencils').forEach(function (value) {
        value.draw();
      });
      this.dataStore.get('land').draw();
      this.dataStore.get('score').draw();
      this.dataStore.get('birds').draw();
      // 帧动画
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    } else {
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destory();
      wx.triggerGC();
    }
  }
}