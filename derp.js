(function (exports) {
  const $M = require('memory');
  $M.set_memcheck(true);
  function fch(csm) {
    const $memcheck_call_push = $M.memcheck_call_push, $memcheck_call_pop = $M.memcheck_call_pop;
    $memcheck_call_push('fch', 'derp.ljs', 1, 0);
    var a = 0;
    var b = 0;
    var c = 0;
    var t = 0;
    a = csm % 10 | 0;
    t = 1;
    b = csm / 10 | 0;
    while (b !== 0) {
      c = b % 10 | 0;
      if (t === 1) {
        c = (c / 5 | 0) + ((c * 2 | 0) % 10 | 0) | 0;
      }
      b = b / 10 | 0;
      a = a + c | 0;
      t = !t;
    }
    a = 10 - (a % 10 | 0) | 0;
    var returnval;
    if (a === 10) {
      returnval = '0';
    }
    if (t === 1) {
      returnval = '0' + ((a & 1 ? a + 9 | 0 : a) / 2 | 0);
    }
    returnval = '0' + a;
console.log(returnval);
    $memcheck_call_pop();
  }
}.call(this, typeof exports === 'undefined' ? derp_ljs = {} : exports));

