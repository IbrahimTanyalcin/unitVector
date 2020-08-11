//jsPerf variants
//unitVecApprox5 seems to be the fastest in modern browsers
Benchmark.prototype.setup = function() {

          
  var sqrt = Math.sqrt,
      rnd = Math.random,
      abs = Math.abs,
      max = Math.max,
      min = Math.min,
      ft = function(t){return t * t},
      fXY = function(x, y){var r = x / y; return y * (r * r * 0.414 + 1.01);},
      k = 0.414,
      m = 1.01,
      ep = 1e-6;
  function unitVecClassic (v2){
      var x = v2.x,
          y = v2.y,
          vLen = sqrt(x * x + y * y) || ep;
      return {x: x / vLen, y: y / vLen};
  }   
  function unitVecApprox (v2){
    var _x = v2.x,
        x = _x,
        _y = v2.y,
        y = _y,
        vLen;
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
    vLen = x * x * 0.414 / y + 1.01 * y;
    return {
      x: _x / vLen,
      y: _y / vLen
    }
  }
  function unitVecApprox2 (v2){
    var temp,
        x = (x = temp = v2.x) < 0 ? -temp : temp,
        y = (y = temp = v2.y) < 0 ? -temp : temp,
        vLen;
    if (x > y){
      temp = x;
      x = y;
      y = temp;
    }
    y = y || 1e-6;
    vLen = x * x * 0.414 / y + 1.01 * y;
    return {
      x: v2.x / vLen,
      y: v2.y / vLen
    }
  }
  
  function unitVecApprox3 (v2){
     var _x = v2.x,
        x = abs(_x),
        _y = v2.y,
        y = abs(_y),
        vLen;
    if (x > y){
      x = x ^ y;
      y = y ^ x;
      x = y ^ x;
    }
    if (!y){
      y = 1e-6;
    }
    vLen = y * (ft(x / y) * 0.414 + 1.01);
    return {
      x: _x / vLen,
      y: _y / vLen
    }
  }
  
  function unitVecApprox4 (v2){
     var _x = v2.x,
        x = abs(_x),
        _y = v2.y,
        y = abs(_y),
        vLen;
    if (x > y){
      x = x ^ y;
      y = y ^ x;
      x = y ^ x;
    }
    y = y || 1e-6;
    vLen = fXY(x, y);
    return {
      x: _x / vLen,
      y: _y / vLen
    }
  }
  
  function unitVecApprox5 (v2){
    var oX = v2.x,
        x = abs(oX),
        oY = v2.y,
        y = abs(oY),
        b = max(x,y) || 1e-6,
        s = min(x,y),
        vLen;
    vLen = s * s * 0.414 / b + 1.01 * b;
    return {
      x: oX / vLen,
      y: oY / vLen
    }
  }
  
  function unitVecApprox6 (v2){
    var oX = v2.x,
        oY = v2.y,
        x = oX,
        y = oY,
        vLen;
    switch((x < 0) * 2  + (y < 0)) {
       case 0:
         if (x > y){
           x = x || 1e-6;
           vLen = y * y * 0.414 / x + 1.01 * x;
         } else {
           y = y || 1e-6;
           vLen = x * x * 0.414 / y + 1.01 * y;
         }
         break;
       case 1:
         if (x > -y){
           x = x || 1e-6;
           vLen = y * y * 0.414 / x + 1.01 * x;
         } else {
           y = -y || 1e-6;
           vLen = x * x * 0.414 / y + 1.01 * y;
         }
         break;
       case 2:
         if (-x > y){
             x = -x || 1e-6;
             vLen = y * y * 0.414 / x + 1.01 * x;
         } else {
             y = y || 1e-6;
             vLen = x * x * 0.414 / y + 1.01 * y;
         }
         break;
       case 3:
         if (-x > -y){
             x = -x || 1e-6;
             vLen = y * y * 0.414 / x + 1.01 * x;
         } else {
             y = -y || 1e-6;
             vLen = x * x * 0.414 / y + 1.01 * y;
         }
    }
    return {
       x: oX / vLen,
       y: oY / vLen
    };
  }
  
  function unitVecApprox7 (v2){
    var oX = v2.x,
        oY = v2.y,
        x = oX,
        y = oY,
        vLen;
    if (x < 0) {
       if (y < 0) {
           if (-x > -y){
             x = -x || 1e-6;
             vLen = y * y * 0.414 / x + 1.01 * x;
           } else {
             y = -y || 1e-6;
             vLen = x * x * 0.414 / y + 1.01 * y;
           }
       } else {
          if (-x > y){
             x = -x || 1e-6;
             vLen = y * y * 0.414 / x + 1.01 * x;
         } else {
             y = y || 1e-6;
             vLen = x * x * 0.414 / y + 1.01 * y;
         }
       }
    } else {
       if (y < 0) {
          if (x > -y){
            x = x || 1e-6;
            vLen = y * y * 0.414 / x + 1.01 * x;
          } else {
            y = -y || 1e-6;
            vLen = x * x * 0.414 / y + 1.01 * y;
          }
       } else {
          if (x > y){
            x = x || 1e-6;
            vLen = y * y * 0.414 / x + 1.01 * x;
          } else {
            y = y || 1e-6;
            vLen = x * x * 0.414 / y + 1.01 * y;
          }
       }
    }
    return {
       x: oX / vLen,
       y: oY / vLen
    };
  }

        
  };
