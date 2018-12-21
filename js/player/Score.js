import { DataStore } from "../base/DateStore";

// 积分器类
export class Score {
 constructor () {
   this.ctx = DataStore.getInstance().ctx;
   this.scoreNumber = 0;
  // 因为canvas刷新的很快，所以需要一个变量控制加分，只加一次
  this.isScore = true;
 }

 draw () {
  //  console.log(this.ctx)
  this.ctx.font = '25px Arial';
  this.ctx.fillStyle = "#333";
   this.ctx.fillText(`${this.scoreNumber}`, 20,40);
 }
}