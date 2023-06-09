// variables: A B
// constants: + - "[" "]"
// axiom: A
// rules: (A -> B+[[A]-A]-B[-BA]+A), (B -> BB)
// angle: pi/7

var start = "A";
var result = start;
var rules;
var len = 4;
var lastState = 0; // assigned starting state of 0

rules = {
    "A": [
        {
            // state 0
            probability: [0.2, 0.4, 0.4],
            out: "A[+A]A[-A]A",
        },
        {
            // state 1
            probability: [0.4, 0.2, 0.4],
            out: "AA-[-A+A+B]+[+A-A-A]",
        },
        {
            // state 2
            probability: [0.4, 0.4, 0.2],
            out: "AA+[+A-A-A]-[-A+A+B]",
        }
    ]
}

function create() {
  var nextText = "";
  for (var i = 0; i < result.length; i++) {
    let r = Math.random();
    let p = 0;
    var current = result.charAt(i);
    if (current == "A") {
        for (let i = 0; i < 3; i++){
            p += rules.A[lastState].probability[i]
            if (r < p) {
                nextText += rules.A[i].out;
                lastState = i;
            }
        }
    } else {
        nextText += current;
    }
  }
  result = nextText;
  createP(result);
  turtle();
}

function turtle() {
    background(0);
    resetMatrix();
    translate(width / 2, height);
    stroke(255);

    for (var i = 0; i < result.length; i++) {
        var current = result.charAt(i);

        if (current == "A") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "-") {
            rotate(PI/7);    
        } else if (current == "+") {
            rotate(-PI/7);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        } else if (current == "B") {
            circle(0,0,len);
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system + markov chains: fractal plant");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}