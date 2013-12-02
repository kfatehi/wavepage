/*
 * Much of this is borrowed from 
 * http://jsfiddle.net/gamealchemist/DAShs/1/
 */

var A = {
  period: 10,
  oscillation: 150,
  fps: 60,
  n: 1,
  vPosition: 50,
  loopId: false,
  mutations: {
    simpleSin: function(x) {
      return Math.sin(x % A.period);
    },
    sawtoothSin: function(x) {
      return (x % A.period);
    },
    squaredSin: function(x) {
      return( (x%A.period)<A.oscillation?A.oscillation:0 );
    },
    triangularSin: function(x) {
      return( Math.abs((x%A.period)-A.oscillation) );
    }
  }
}

A.selectedMutation = A.mutations.simpleSin;


$(document).ready(function() {
  var $sandbox = $('<div id=sandbox>');
  $('body').append($sandbox);
  var $antenna = $("<div class=antenna>");
  var $canvas = $("<canvas width="+$sandbox.width()+" height="+$sandbox.height()+">");

  $sandbox.empty().
    append($antenna).
    append($canvas);

  var transmitBtn = $("<button>transmit</button>");
  transmitBtn.click(function() {
    if (A.loopId) {
      cancelAnimationFrame(A.loopId);
      A.loopId = false;
    }
    A.canvas = $canvas.get(0)
    A.ctx = A.canvas.getContext('2d');
    A.ctx.lineWidth = 1;
    animate();
  });
  $('body').append(transmitBtn);

  for (var key in A.mutations) {
    var btn = $("<button>"+key+"</button>");
    btn.click(function() {
      A.selectedMutation = A.mutations[$(this).text()]
    });
    $('body').append(btn);
  }
});



function animate() {
  A.loopId = requestAnimationFrame(animate);
  A.n += 1;
  if (A.n > 300) {
    A.n = 0;
  }
  A.ctx.clearRect(0, 0, A.canvas.width, A.canvas.height);

  A.ctx.beginPath();
  for (var x = 0; x < A.n; x++) {
    //var y = sin(x/2) * 20; // allow user to select and modify wave mutation
    var y = A.selectedMutation(x);
    A.ctx.lineTo(x, y + A.vPosition);
  }
  A.ctx.stroke();
}

