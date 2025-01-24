// function hamburg(){
//     const navbar = document.querySelector(".dropdown")
//     navbar.style.transform = "translateY(0px)"
// }
// function cancel(){
//     const navbar = document.querySelector(".dropdown")
//     navbar.style.transform = "translateY(-500px)"
// }
// // Typewriter Effect
// const texts = [
//     "DEVELOPER",
//     "STUDENT",
//     "YOUTUBER"
// ]
// let speed  =100;
// const textElements = document.querySelector(".typewriter-text");
// let textIndex = 0;
// let charcterIndex = 0;
// function typeWriter(){
//     if (charcterIndex < texts[textIndex].length){
//         textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
//         charcterIndex++;
//         setTimeout(typeWriter, speed);
//     }
//     else{
//         setTimeout(eraseText, 1000)
//     }
// }
// function eraseText(){
//     if(textElements.innerHTML.length > 0){
//         textElements.innerHTML = textElements.innerHTML.slice(0,-1);
//         setTimeout(eraseText, 50)
//     }
//     else{
//         textIndex = (textIndex + 1) % texts.length;
//         charcterIndex = 0;
//         setTimeout(typeWriter, 500)
//     }
// }
// window.onload = typeWriter



console.clear();
const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.style.display = "block";
canvas.style.width = "100vw";
canvas.style.height = "100vh";

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const gl = canvas.getContext("webgl2");
if (!gl) {
  alert("require webgl 2.0, bye");
}

const vss = `#version 300 es
in vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const fss = `#version 300 es
precision mediump float;
out vec4 o;
uniform vec4 c;
void main() {
  o = c;
}
`;

// Create and compile shaders
const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vss);
gl.compileShader(vs);
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(vs));
  throw 1;
}

const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fss);
gl.compileShader(fs);
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(fs));
  throw 2;
}

const prg = gl.createProgram();
gl.attachShader(prg, vs);
gl.attachShader(prg, fs);
gl.linkProgram(prg);
if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(prg));
  throw 3;
}

gl.detachShader(prg, vs);
gl.deleteShader(vs);
gl.detachShader(prg, fs);
gl.deleteShader(fs);

const $p = gl.getAttribLocation(prg, "p");
const $c = gl.getUniformLocation(prg, "c");

const va = gl.createVertexArray();
gl.bindVertexArray(va);

const N = 300;
let ps = new Float32Array(2 + N * 2 * 2);
ps[0] = 0;
ps[1] = 0;
let j = 2;
for (let i = 0; i < N; ++i) {
  ps[j++] = Math.random() * 2 - 1;
  ps[j++] = Math.random() * 2 - 1;
  ps[j++] = Math.random() * 2 - 1;
  ps[j++] = Math.random() * 2 - 1;
}

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, ps, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray($p);
gl.vertexAttribPointer($p, 2, gl.FLOAT, false, 0, 0);

let idxs = new Uint16Array(3 * N);
j = 0;
for (let i = 0; i < N; ++i) {
  idxs[j++] = 0;
  idxs[j++] = 1 + i * 2;
  idxs[j++] = 2 + i * 2;
}

const ibuf = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idxs, gl.STATIC_DRAW);

gl.bindVertexArray(null);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0.1, 0.1, 0.1, 1);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.enable(gl.BLEND);
gl.disable(gl.CULL_FACE);
gl.useProgram(prg);
gl.bindVertexArray(va);

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform4fv($c, [0.2, 0.2, 0.2, 0.02]);
  gl.drawElements(gl.TRIANGLES, idxs.length, gl.UNSIGNED_SHORT, 0);
}
render();

document.body.onmousemove = (e) => {
  ps[0] = (e.clientX / window.innerWidth) * 2 - 1;
  ps[1] = -1 * (e.clientY / window.innerHeight) * 2 - 1;
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, ps.slice(0, 2));
  render();
};

// Dropdown functions
function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}
function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

// Typewriter Effect
const texts = ["DEVELOPER", "STUDENT", "YOUTUBER"];
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;
const speed = 100;

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
    textElements.innerHTML += texts[textIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1000);
  }
}
function eraseText() {
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1);
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    characterIndex = 0;
    setTimeout(typeWriter, 500);
  }
}
window.onload = typeWriter;
