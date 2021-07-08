const Pattern = require("../lib/Pattern");

function Canvas() {
  this.width = 100;
  this.height = 100;
  this.ctx = {
    translate(x, y) {
      this.trans = { x, y };
    },
    moveTo(x, y) {},
    lineTo(x, y) {},
    save() {},
    setTransform(...args) {},
    drawImage(...args) {},
    fillRect(...args) {
      this.rect = args;
    },
    restore() {},
    beginPath() {},
    stroke() {},
    closePath() {},
    strokeStyle: "",
    globalCompositeOperation: "",
    fillStyle: "",
    lineWidth: 0,
  };
  this.getContext = (type) => {
    return this.ctx;
  };
}

describe("Pattern", () => {
  it("should be init successfuly and has canvas field", () => {
    const canvas = new Canvas();
    expect(new Pattern(canvas, 1, 1)).toMatchObject({ canvas });
  });
  it("should be init successfuly and has ctx field", () => {
    const canvas = new Canvas();
    expect(new Pattern(canvas, 1, 1)).toMatchObject({ _ctx: canvas.ctx });
  });
  it("should throw error if pattern has lines != 9 or 17", () => {
    const canvas = new Canvas();
    const p = new Pattern(canvas, 1, 1);
    const wrongPatternString1 = `01`;
    const wrongPatternString2 = `01\n`.repeat(18);
    expect(() => p.draw(wrongPatternString1, true)).toThrow();
    expect(() => p.draw(wrongPatternString2, true)).toThrow();
  });
  it("shouldn't throw error if pattern has lines = 9 or 17", () => {
    const canvas = new Canvas();
    const p = new Pattern(canvas, 1, 1);
    const wrongPatternString1 = `01\n`.repeat(8);
    const wrongPatternString2 = `01\n`.repeat(16);
    expect(p.draw(wrongPatternString1, true)).toBeInstanceOf(Pattern);
    expect(p.draw(wrongPatternString2, true)).toBeInstanceOf(Pattern);
  });
  it("shouldn't has grid", () => {
    const canvas = new Canvas();
    const p1 = new Pattern(canvas, 1, 1);
    const wrongPatternString1 = `01\n`.repeat(8);
    p1.draw(wrongPatternString1, false);
    expect(p1._ctx.rect).toBeUndefined();
  });
  it("should has a grid", () => {
    const canvas = new Canvas();
    const p = new Pattern(canvas, 1, 1);
    const wrongPatternString1 = `01\n`.repeat(8);
    p.draw(wrongPatternString1, true);
    expect(p._ctx.rect).toHaveLength(4);
  });
});
