function getBuffer(canvas) {
  return new Promise((res, rej) =>
    canvas.toBuffer((err, buff) => {
      if (err) {
        rej(err);
      } else {
        res(buff);
      }
    })
  );
}

function isTrue() {
  return Math.random() >= 0.5;
}

/**
 * get random stitch count 1-max
 * @param {number} max max stitch count
 */
function getStitchCount(max) {
  /*
   Fix stitch length: only 1, 3, 5
   */
  const rnd = Math.floor(Math.random() * max) + 1;
  const num = rnd % 2 ? rnd - 1 : rnd;
  return num > 5 ? 5 : num;
}

function getLine(len) {
  const genLine = (curLen, prevSpace) => {
    if (len - curLen === 1 && prevSpace) {
      return "1";
    }
    if (len - curLen <= 1) return "";
    if (isTrue() && prevSpace) {
      const sc = getStitchCount(len - curLen);
      return sc.toString(20) + genLine(curLen + sc + 1, false);
    } else {
      return "0" + genLine(curLen + (prevSpace ? 1 : 2), true);
    }
  };
  let ln = genLine(0, true);
  return "0".repeat(3) + ln;
}

function generatePattern(isSymmetric = true) {
  let str = "";
  let len = 1;
  const maxLineNum = isSymmetric ? 9 : 17;
  for (let i = 0; i < maxLineNum; i++) {
    const strLine = getLine(len);
    len = i < 8 ? len + 2 : len - 2;
    str += strLine + "\n";
  }
  str = str.slice(0, -1);
  return str;
}

module.exports = { getBuffer, generatePattern, isTrue, getStitchCount };
