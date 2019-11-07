class Penguin {
  constructor(startX, startY, step, fieldWidth, fieldHeight) {
    this.currentX = startX;
    this.currentY = startY;

    this.step = step;

    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.endX = 0;
    this.endY = 0;

    this.finished = false;

    this.generateEnd();
  }

  generateEnd() {
    this.setEnd(
      Math.random() * this.fieldWidth,
      Math.random() * this.fieldHeight
    );
  }

  setEnd(x, y) {
    this.endX = x;
    this.endY = y;
    this.start();
  }

  setSize(w, h) {
    this.fieldWidth = w;
    this.fieldHeight = h;
    this.start();
  }

  next() {
    if (
      this.currentX < 0 ||
      this.currentY < 0 ||
      this.currentX > this.fieldWidth ||
      this.currentY > this.fieldHeight
    ) {
      this.finish();
    }

    const XCathetus = this.endX - this.currentX;
    const YCathetus = this.endY - this.currentY;
    const hypotenuse = Math.sqrt(
      Math.pow(XCathetus, 2) + Math.pow(YCathetus, 2)
    );

    const sin = YCathetus / hypotenuse;
    const cos = XCathetus / hypotenuse;

    const newXCathetus = cos * this.step;
    const newYCathetus = sin * this.step;

    this.currentX += newXCathetus;
    this.currentY += newYCathetus;

    if (
      Math.abs(this.currentX - this.endX) < this.step &&
      Math.abs(this.currentY - this.endY) < this.step
    ) {
      this.finish();
    } else {
      this.start();
    }

    return { x: this.currentX, y: this.currentY };
  }

  start() {
    this.finished = false;
  }

  finish() {
    this.finished = true;
  }

  isFinished() {
    return this.finished;
  }
}
