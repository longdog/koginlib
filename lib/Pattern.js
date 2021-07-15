module.exports = class Pattern {
  /**
   * Kogin pattern class
   * @param {object} canvas
   * @param {number} stitchStep one stitch length
   * @param {number} stitchWeight stitch weight
   */
  constructor(canvas, { stitchStep, stitchWeight }) {
    this.width = canvas.width;
    this.height = canvas.height;
    this._stitch = { stitchStep, stitchWeight };
    this.canvas = canvas;
    this._ctx = this.canvas.getContext("2d");
    this._ctx.translate(0.5, 0.5);
    this._ctx.translate(stitchStep / 2 - 0.5, stitchStep / 2);
  }

  _drawStitch(x, y, len) {
    this._ctx.lineWidth = this._stitch.stitchWeight;
    this._ctx.moveTo(x * this._stitch.stitchStep, y * this._stitch.stitchStep);
    this._ctx.lineTo(
      x * this._stitch.stitchStep + len * this._stitch.stitchStep,
      y * this._stitch.stitchStep
    );
  }

  _mirror(horizontal = false, vertical = false) {
    this._ctx.save();
    this._ctx.setTransform(
      horizontal ? -1 : 1,
      0,
      0,
      vertical ? -1 : 1,
      horizontal ? this.width : 0,
      vertical ? this.height : 0
    );
    this._ctx.drawImage(this.canvas, 0, 0);
    this._ctx.restore();
  }

  _drawGrid() {
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    this._ctx.strokeStyle = "rgba(0,0,0,0.4)";
    for (let x = 0; x <= this.width; x += this._stitch.stitchStep) {
      this._ctx.moveTo(x, 0);
      this._ctx.lineTo(x, this.height);
      for (let y = 0; y <= this.height; y += this._stitch.stitchStep) {
        this._ctx.moveTo(0, y);
        this._ctx.lineTo(this.width, y);
      }
    }
    this._ctx.moveTo(this.width - 1, 0);
    this._ctx.lineTo(this.width - 1, this.height);
    this._ctx.stroke();
    this._ctx.closePath();
  }

  _withGrid() {
    this._ctx.save();
    // for pixel perfect
    this._ctx.translate(
      -this._stitch.stitchStep / 2 + 0.5,
      -this._stitch.stitchStep / 2
    );
    this._drawGrid(this._ctx);
    this._ctx.fillStyle = "rgba(255,255,255,1)";
    // white background
    this._ctx.fillRect(0, 0, this.width, this.height);
    this._ctx.restore();
    return this;
  }

  draw(str, withGrid) {
    const patternArr = str.split(/\n/);
    if (patternArr.length !== 9 && patternArr.length !== 17) {
      throw new Error("wrong format");
    }
    const isSymmetric = patternArr.length === 9;
    if (isSymmetric) {
      this._drawPartStr(patternArr, true);
    } else {
      this._drawPartStr(patternArr.slice(0, 9), true);
      this._drawPartStr(patternArr.slice(9), false);
    }
    if (isSymmetric) {
      this._mirror(true, false);
      this._mirror(true, true);
    } else {
      this._mirror(true, false);
    }
    this._ctx.globalCompositeOperation = "destination-over";
    if (!withGrid) {
      return this;
    }
    return this._withGrid();
  }

  _getLen(line) {
    switch (line) {
      case 1:
      case 25:
        return 2;
      case 2:
      case 24:
        return 6;
      default:
        return 4;
    }
  }
  _drawLine(pat, y, shift) {
    let len = this._getLen(y);
    this._drawStitch(shift, y, len);
    let i = shift + 5;
    let hasPrev = false;
    if (pat) {
      for (const p of pat) {
        if (p === "0") {
          i++;
        } else {
          const n = parseInt(p, 20) + 1;
          this._drawStitch(hasPrev ? ++i : i, y, n);
          i += n;
          hasPrev = true;
        }
      }
    }
  }
  _drawPartStr(patternArr, isTop) {
    this._ctx.strokeStyle = "rgba(0,0,255,1)";
    this._ctx.beginPath();
    if (isTop) {
      this._drawTopStr(patternArr);
    } else {
      this._drawBottomStr(patternArr);
    }
    this._ctx.stroke();
    this._ctx.closePath();
  }

  _drawBottomStr(patternArr) {
    let shift = 4;
    for (let y = 14; y <= 25; y++) {
      shift += 2;
      this._drawLine(patternArr.shift(), y, shift);
    }
  }

  _drawTopStr(patternArr) {
    let shift = 2;
    for (let y = 13; y >= 1; y--) {
      shift += 2;
      this._drawLine(patternArr.pop(), y, shift);
    }
  }
};
