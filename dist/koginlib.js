!(function (t, i) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = i(require("canvas")))
    : "function" == typeof define && define.amd
    ? define(["canvas"], i)
    : "object" == typeof exports
    ? (exports.koginlib = i(require("canvas")))
    : (t.koginlib = i(t.canvas));
})(this, function (t) {
  return (
    (i = {
      909: (t) => {
        t.exports = class {
          constructor(t, i, e) {
            (this.width = t.width),
              (this.height = t.height),
              (this._stitch = { stitchStep: i, stitchWeight: e }),
              (this.canvas = t),
              (this._ctx = this.canvas.getContext("2d")),
              this._ctx.translate(0.5, 0.5),
              this._ctx.translate(i / 2 - 0.5, i / 2);
          }
          _drawStitch(t, i, e) {
            (this._ctx.lineWidth = this._stitch.stitchWeight),
              this._ctx.moveTo(
                t * this._stitch.stitchStep,
                i * this._stitch.stitchStep
              ),
              this._ctx.lineTo(
                t * this._stitch.stitchStep + e * this._stitch.stitchStep,
                i * this._stitch.stitchStep
              );
          }
          _mirror(t = !1, i = !1) {
            this._ctx.save(),
              this._ctx.setTransform(
                t ? -1 : 1,
                0,
                0,
                i ? -1 : 1,
                t ? this.width : 0,
                i ? this.height : 0
              ),
              this._ctx.drawImage(this.canvas, 0, 0),
              this._ctx.restore();
          }
          _drawGrid() {
            (this._ctx.lineWidth = 1),
              this._ctx.beginPath(),
              (this._ctx.strokeStyle = "rgba(0,0,0,0.4)");
            for (let t = 0; t <= this.width; t += this._stitch.stitchStep) {
              this._ctx.moveTo(t, 0), this._ctx.lineTo(t, this.height);
              for (let t = 0; t <= this.height; t += this._stitch.stitchStep)
                this._ctx.moveTo(0, t), this._ctx.lineTo(this.width, t);
            }
            this._ctx.moveTo(this.width - 1, 0),
              this._ctx.lineTo(this.width - 1, this.height),
              this._ctx.stroke(),
              this._ctx.closePath();
          }
          _withGrid() {
            return (
              this._ctx.save(),
              this._ctx.translate(
                -this._stitch.stitchStep / 2 + 0.5,
                -this._stitch.stitchStep / 2
              ),
              this._drawGrid(this._ctx),
              (this._ctx.fillStyle = "rgba(255,255,255,1)"),
              this._ctx.fillRect(0, 0, this.width, this.height),
              this._ctx.restore(),
              this
            );
          }
          draw(t, i) {
            const e = t.split(/\n/);
            if (9 !== e.length && 17 !== e.length)
              throw new Error("wrong format");
            const s = 9 === e.length;
            return (
              s
                ? this._drawPartStr(e, !0)
                : (this._drawPartStr(e.slice(0, 9), !0),
                  this._drawPartStr(e.slice(9), !1)),
              s
                ? (this._mirror(!0, !1), this._mirror(!0, !0))
                : this._mirror(!0, !1),
              (this._ctx.globalCompositeOperation = "destination-over"),
              i ? this._withGrid() : this
            );
          }
          _getLen(t) {
            switch (t) {
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
          _drawLine(t, i, e) {
            let s = this._getLen(i);
            this._drawStitch(e, i, s);
            let r = e + 5,
              h = !1;
            if (t)
              for (const e of t)
                if ("0" === e) r++;
                else {
                  const t = parseInt(e, 20) + 1;
                  this._drawStitch(h ? ++r : r, i, t), (r += t), (h = !0);
                }
          }
          _drawPartStr(t, i) {
            (this._ctx.strokeStyle = "rgba(0,0,255,1)"),
              this._ctx.beginPath(),
              i ? this._drawTopStr(t) : this._drawBottomStr(t),
              this._ctx.stroke(),
              this._ctx.closePath();
          }
          _drawBottomStr(t) {
            let i = 4;
            for (let e = 14; e <= 25; e++)
              (i += 2), this._drawLine(t.shift(), e, i);
          }
          _drawTopStr(t) {
            let i = 2;
            for (let e = 13; e >= 1; e--)
              (i += 2), this._drawLine(t.pop(), e, i);
          }
        };
      },
      568: (t, i, e) => {
        const s = e(909),
          { generatePattern: r } = e(988);
        t.exports = {
          patternFactory: function (t, i, r, h, n) {
            return (o, c = !0) => {
              n || (n = e(395).createCanvas(t, i));
              const a = new s(n, r, h);
              return a.draw(o, c), a;
            };
          },
          patternGenerator: function (t, i) {
            return function* (e) {
              for (;;) {
                const s = r(e);
                yield t(s, i);
              }
            };
          },
        };
      },
      988: (t) => {
        function i() {
          return Math.random() >= 0.5;
        }
        function e(t) {
          const i = Math.floor(Math.random() * t) + 1,
            e = i % 2 ? i : i - 1;
          return e > 5 ? 5 : e;
        }
        function s(t) {
          const s = (r, h) => {
            if (t - r == 1 && h) return "1";
            if (t - r <= 1) return "";
            if (i() && h) {
              const i = e(t - r);
              return i.toString(20) + s(r + i + 1, !1);
            }
            return "0" + s(r + (h ? 1 : 2), !0);
          };
          let r = s(0, !0);
          return "0".repeat(3) + r;
        }
        t.exports = {
          getBuffer: function (t) {
            return new Promise((i, e) =>
              t.toBuffer((t, s) => {
                t ? e(t) : i(s);
              })
            );
          },
          generatePattern: function (t = !0) {
            let i = "",
              e = 1;
            const r = t ? 9 : 17;
            for (let t = 0; t < r; t++) {
              const r = s(e);
              (e = t < 8 ? e + 2 : e - 2), (i += r + "\n");
            }
            return (i = i.slice(0, -1)), i;
          },
          isTrue: i,
          getStitchCount: e,
        };
      },
      395: (i) => {
        "use strict";
        i.exports = t;
      },
    }),
    (e = {}),
    (function t(s) {
      var r = e[s];
      if (void 0 !== r) return r.exports;
      var h = (e[s] = { exports: {} });
      return i[s](h, h.exports, t), h.exports;
    })(568)
  );
  var i, e;
});
