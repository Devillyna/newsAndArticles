class Penguin {
  constructor(startX, startY, sizeX, sizeY, step, fieldWidth, fieldHeight) {
    this.currentX = startX;
    this.currentY = startY;

    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.step = step;

    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.endX = 0;
    this.endY = 0;

    this.finished = false;

    this.angle = 0;

    this.generateEnd();
  }

  _getHalfSize(size) {
    return size / 2;
  }

  generateEnd() {
    const x = Math.random() * (this.fieldWidth - this.sizeX);
    const y = Math.random() * (this.fieldHeight - this.sizeY);

    this.setEnd(
      x + this._getHalfSize(this.sizeX),
      y + this._getHalfSize(this.sizeY)
    );
  }

  setEnd(x, y) {
    this.endX = x - this._getHalfSize(this.sizeX);
    this.endY = y - this._getHalfSize(this.sizeY);
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

    // Решение через подобие треугольников

    // const coefficient = this.step / hypotenuse;

    // const newXCathetus = XCathetus * coefficient;
    // const newYCathetus = YCathetus * coefficient;

    // Решение через угол

    const sin = YCathetus / hypotenuse;
    const cos = XCathetus / hypotenuse;

    if (this.endX < this.currentX) {
      this.angle = 180 - 180 - 90 - (sin * 180) / Math.PI;
    } else {
      this.angle = 90 + (sin * 180) / Math.PI;
    }

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
