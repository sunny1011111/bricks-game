function Collision(obj) {
  let defaults = {
    ballSpeedX: 6, // 小球X轴运动速度
    ballSpeedY: 3, // 小球Y轴运动速度\
    ballR: 10,
    rectSpeedX: 10, // 矩形方块的X轴移动速度
    rectSpeedY: 20, // 矩形方块的Y轴移动速度
    rectX: null, // 矩形方块的Y轴移动速度
    rectY: null, // 矩形方块的Y轴移动速度
    rectWidth: 200,
    rectHeight: 10,
    circleX: null, // 矩形方块的Y轴移动速度
    circleY: null, // 矩形方块的Y轴移动速度
    RectItemColor: '#000', // 矩形方块的背景颜色
    width: null, // canvas的宽度
    height: null, // cnavas的高度
    dom: null, // 容器
  };
  this.defaults = Object.assign(defaults, obj);
}

Collision.prototype.init = function (dom) {
  this.defaults.dom = dom;
  let canvas = document.createElement('canvas');
  dom.appendChild(canvas);
  // window.getComputedStyle(dom).width 100px
  // dom.getBoundingClientRect().width 100
  try {
    canvas.width = dom.getBoundingClientRect().width;
    canvas.height = dom.getBoundingClientRect().height;
    this.defaults.width = dom.getBoundingClientRect().width;
    this.defaults.height = dom.getBoundingClientRect().height;
  } catch (e) {
    throw '请为父容器设置宽高';
  }
  let that = this;
  window.addEventListener('keydown', function (e) {
    // 按键控制滑块移动
    let x = that.defaults.rectX,
      y = that.defaults.rectY;
    let keyCode = e.keyCode;
    if (keyCode != 40 && keyCode != 37 && keyCode != 38 && keyCode != 39) return;
    switch (keyCode) {
      case 40: // 下
        y = y + that.defaults.rectSpeedY;
        if (y > that.defaults.height - that.defaults.rectHeight) {
          y = that.defaults.height - that.defaults.rectHeight;
        }
        // that.drawRect(ctx, x, y);

        break;
      case 38: // 上
        y = y - that.defaults.rectSpeedY;
        if (y < 0) {
          y = 0;
        }
        // that.drawRect(ctx, x, y);
        break;
      case 37: // 左
        x = x - that.defaults.rectSpeedX;
        if (x < 0) {
          x = 0;
        }
        // that.drawRect(ctx, x, y);
        break;
      case 39: // 右
        x = x + that.defaults.rectSpeedX;
        if (x > that.defaults.width - that.defaults.rectWidth) {
          x = that.defaults.width - that.defaults.rectWidth;
        }
        // that.drawRect(ctx, x, y);
        break;
      default:
        break;
    }
    // that.draw(ctx, x, y);
    that.drawRect(ctx, x, y);
  });
  let ctx = canvas.getContext('2d');

  this.defaults.circleX = this.defaults.width / 2;
  this.defaults.circleY = this.defaults.height * 0.1;
  this.drawRect(ctx, this.defaults.width * 0.2, this.defaults.height * 0.8);
  this.circleMotion(ctx, this.defaults.circleX, this.defaults.circleY);
};

Collision.prototype.drawRect = function (ctx, x, y) {
  if (
    x < 0 ||
    x > this.defaults.width - this.defaults.rectWidth ||
    y < 0 ||
    y > this.defaults.height - this.defaults.rectHeight
  ) {
    return;
  }
  ctx.clearRect(
    this.defaults.rectX - 2,
    this.defaults.rectY - 2,
    this.defaults.rectWidth + 10,
    this.defaults.rectHeight + 4
  );
  ctx.fillStyle = this.defaults.RectItemColor;
  ctx.fillRect(x, y, this.defaults.rectWidth, this.defaults.rectHeight);

  this.defaults.rectX = x;
  this.defaults.rectY = y;
};

Collision.prototype.drawCircle = function (ctx, x, y) {
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  this.defaults.circleX = x;
  this.defaults.circleY = y;
};

Collision.prototype.circleMotion = function (ctx) {
  let that = this;
  function v() {
    ctx.clearRect(
      that.defaults.circleX - that.defaults.ballR,
      that.defaults.circleY - that.defaults.ballR,
      that.defaults.ballR * 2,
      that.defaults.ballR * 2
    );
    that.defaults.circleY += that.defaults.ballSpeedY;
    that.defaults.circleX += that.defaults.ballSpeedX;
    if (that.defaults.circleX < 0) {
      // 如果小球触碰到左边界
      that.defaults.ballSpeedX = -that.defaults.ballSpeedX;
    }
    if (that.defaults.circleX >= that.defaults.width - that.defaults.ballR) {
      // 如果小球触碰到右边界
      that.defaults.ballSpeedX = -that.defaults.ballSpeedX;
    }
    if (that.defaults.circleY < 0) {
      // 如果小球触碰到上边界
      that.defaults.ballSpeedY = -that.defaults.ballSpeedY;
    }
    if (that.defaults.circleY > that.defaults.height) {
      // 如果小球触碰到下边界
      alert('游戏结束');
      return;
    }
    if (
      that.defaults.circleY + that.defaults.ballR >= that.defaults.rectY &&
      that.defaults.circleY + that.defaults.ballR <= that.defaults.rectY + that.defaults.rectHeight &&
      that.defaults.circleX >= that.defaults.rectX &&
      that.defaults.circleX <= that.defaults.rectX + that.defaults.rectWidth
    ) {
      // 小球触碰到滑块
      that.defaults.ballSpeedY = -that.defaults.ballSpeedY;
    }
    that.drawCircle(ctx, that.defaults.circleX, that.defaults.circleY);
    window.requestAnimationFrame(v);
  }
  v();
};
Collision.prototype.draw = function (ctx, rx, ry) {
  this.drawRect(ctx, rx, ry);
  // function v(){
  //     ctx.clearRect(0, 0, that.defaults.width, that.defaults.height);
  //     that.drawRect(ctx, that.defaults.rectX, that.defaults.rectY)
  //     that.defaults.circleY += that.defaults.ballSpeedY;
  //     that.defaults.circleX += that.defaults.ballSpeedX;
  //     if(that.defaults.circleX < 0) { // 如果小球触碰到左边界
  //         that.defaults.circleX += that.defaults.ballSpeedX;
  //     }
  //     if(that.defaults.circleX >= (that.defaults.width - that.defaults.ballR)) { // 如果小球触碰到右边界
  //         that.defaults.circleX -= that.defaults.ballSpeedX;
  //     }
  //     if(that.defaults.circleY < 0) { // 如果小球触碰到上边界
  //         that.defaults.circleY += that.defaults.ballSpeedY;
  //     }
  //     if(that.defaults.circleY > that.defaults.height) { // 如果小球触碰到下边界
  //         alert('游戏结束');
  //         return
  //     }
  //     if((that.defaults.circleY + that.defaults.ballR) >= that.defaults.rectY && that.defaults.circleX >= that.defaults.rectX && that.defaults.circleX <= that.defaults.rectX + 100) { // 小球触碰到滑块
  //         that.defaults.circleY -= that.defaults.ballSpeedY;
  //     }
  //     that.drawCircle(ctx, that.defaults.circleX, that.defaults.circleY);
  //     window.requestAnimationFrame(v)
  // }
  // v()

  // window.requestAnimationFrame(this.draw(ctx, this.defaults.rectX, this.defaults.rectY))
};
