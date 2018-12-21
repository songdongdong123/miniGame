// 资源文件加载器,确保图片资源加载完成后才进行渲染
import { Resources } from './Resources';
export class ResourcesLoader {
  //1.初始化
  constructor () {
    this.map = new Map(Resources);
    for (let [key, value] of this.map) {
      const image = wx.createImage();
      image.src = value;
      this.map.set(key, image);
    }
  }
  
  // 全部加载结束函数
  onLoaded (callback) {
    let loadedCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++;
        if (loadedCount >= this.map.size) {
          callback(this.map);
        }
      }
    }
  }

  // 静态工厂
  static create () {
    return new ResourcesLoader();
  }
}