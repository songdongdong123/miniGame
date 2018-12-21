import { ResourcesLoader } from "./js/base/ResourcesLoader";
import { Director } from "./js/Director";
import { BackGround } from "./js/runtime/BackGround";
import { DataStore } from "./js/base/DateStore";
import { Land } from './js/runtime/Land';
import { Brids } from "./js/player/Brids";
import { StartButton } from "./js/player/StartButton";
import { Score } from "./js/player/Score";

// 初始化整个游戏的精灵，作为游戏开始的入口

export class Main {
  constructor () {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourcesLoader.create();
    loader.onLoaded(map => this.onResourcesFirstLoaded(map));
  }

  onResourcesFirstLoaded (map) {
    // 资源第一次加载
    // 游戏资源只需要加载一次即可
    // 重新开始只需要重置游戏逻辑即可

    /**
     * 1.直接将变量附在datastore上的变量是要长期保存的，
     * 2.而通过put将 变量放置在datastore的map上的变量是需要不断销毁的
     */
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }
  init () {
    // 首先重置游戏是没有结束的
    this.director.isGameOver = false;
    this.dataStore.put('background', BackGround)
                  .put('land', Land)
                  .put('pencils', [])
                  .put('birds', Brids)
                  .put('startButton', StartButton)
                  .put('score', Score);
    this.registerEvent();
    // 要在游戏逻辑运行之前
    this.director.createPencil();
    this.director.run();
  }
  reStart (e) {
    const startButton = this.dataStore.get('startButton');
    // 手指点击的坐标
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    // 起始x坐标
    let startX = startButton.x;
    // 起始y坐标
    let startY = startButton.y;
    // 结束x坐标
    let endX = startButton.x + startButton.width;
    // 结束y坐标
    let endY = startButton.y + startButton.height;
    if (x >= startX && x <= endX && y >= startY && y <= endY) {
      // console.log('重新开始');
      this.init();
    }
  }
  registerEvent () {
    wx.onTouchStart((e) => {
      if (this.director.isGameOver) {
        // 点击开始按钮，重新开始游戏
        this.reStart(e);
      } else {
        this.director.birdsEvent();
      }
    })
  }
}