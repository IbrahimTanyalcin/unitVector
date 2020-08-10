function unitVec(vec2){
  var x = vec2.x,
      y = vec2.y,
      vecLen;
  if (x < 0){
    x = -x;
  }
  if (y < 0){
    y = -y;
  }
  if (x > y){
    x = x ^ y;
    y = y ^ x;
    x = y ^ x;
  }
  if (!y){
    y = 1e-6;
  }
  vecLen = x * x * 0.414 / y + 1.01 * y;
  return {
    x: vec2.x / vecLen,
    y: vec2.y / vecLen
  }
}
