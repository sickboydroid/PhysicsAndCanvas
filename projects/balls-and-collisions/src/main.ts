import "./style.css";
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const GRAVITY = 9;
let balls: Ball[] = [];
type Vector = [number, number];

canvas.addEventListener("click", (event) => {
  const ball = new Ball(event.x, event.y);
  balls.push(ball);
});

/***************************Vector UTILS*****************************/

function dot(v1: Vector, v2: Vector) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

function resolve(along: Vector, v: Vector): { along: Vector; perp: Vector } {
  const alongComponent = component(along, v);
  const perpendicularComponent = sub(alongComponent, v);
  return { along: alongComponent, perp: perpendicularComponent };
}

function net(...vectors: Vector[]): Vector {
  let res: Vector = [0, 0];
  for (const v of vectors) {
    res = add(res, v);
  }
  return res;
}

function add(v1: Vector, v2: Vector): Vector {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}
function sub(v: Vector, from: Vector): Vector {
  return [from[0] - v[0], from[1] - v[1]];
}

function component(along: Vector, v: Vector): Vector {
  const unitAlong = unitVector(along);
  const mag = dot(unitAlong, v);
  return [mag * unitAlong[0], mag * unitAlong[1]];
}

function magnitude(v: Vector) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function unitVector(v: Vector): Vector {
  const mag = magnitude(v);
  return [v[0] / mag, v[1] / mag];
}

function mul(scaler: number, v: Vector): Vector {
  return [v[0] * scaler, v[1] * scaler];
}
/*************************BALL**********************************/

class Ball {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  radius = 50;
  mass = 10;
  color = `hsl(${Math.random() * 360}, 60%, 50%)`;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime: number) {
    let ax = 0;
    let ay = GRAVITY;
    this.vx += ax * deltaTime * 0.99;
    this.vy += ay * deltaTime * 0.99;
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
/***********************COLLISION**************************/
function resolveCollisions() {
  const e = 1;
  for (let i = 0; i < balls.length; i++) {
    // floor
    const floorY = HEIGHT - 10;
    if (balls[i].y + balls[i].radius > floorY) {
      balls[i].y = floorY - balls[i].radius;
      balls[i].vy *= -1;
    }

    // ceiling
    if (balls[i].y - balls[i].radius < 0) {
      balls[i].y = balls[i].radius;
      balls[i].vy *= -1;
    }

    // left wall
    if (balls[i].x - balls[i].radius < 0) {
      balls[i].x = balls[i].radius;
      balls[i].vx *= -1;
    }

    // right wall
    if (balls[i].x + balls[i].radius > WIDTH) {
      balls[i].x = WIDTH - balls[i].radius;
      balls[i].vx *= -1;
    }

    for (let j = i + 1; j < balls.length; j++) {
      const b1 = balls[i];
      const b2 = balls[j];
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // not colliding
      if (dist >= b1.radius + b2.radius) continue;

      // separate the balls
      const normal: Vector = [dx / dist, dy / dist];
      const disp = mul(b1.radius + b2.radius - dist, normal);
      [b2.x, b2.y] = add([b2.x, b2.y], mul(0.5, disp));
      [b1.x, b1.y] = add([b1.x, b1.y], mul(-0.5, disp));

      const vball2 = resolve(normal, [b2.vx, b2.vy]);
      const vball1 = resolve(normal, [b1.vx, b1.vy]);
      // already moving away
      if (dot(sub(vball1.along, vball2.along), normal) > 0) continue;
      const m1 = b1.mass;
      const m2 = b2.mass;
      const u1 = dot(normal, vball1.along);
      const u2 = dot(normal, vball2.along);

      // final velocities along the common normals
      const v1 = ((m1 - e * m2) * u1 + (1 + e) * m2 * u2) / (m1 + m2);
      const v2 = ((m2 - e * m1) * u2 + (1 + e) * m1 * u1) / (m1 + m2);
      const newVelball1 = net(mul(v1, normal), vball1.perp);
      const newVelball2 = net(mul(v2, normal), vball2.perp);
      [b1.vx, b1.vy] = [newVelball1[0], newVelball1[1]];
      [b2.vx, b2.vy] = [newVelball2[0], newVelball2[1]];
    }
  }
}

/************Walls********************/
function drawWalls() {
  ctx.fillStyle = "white";
  // floor
  ctx.fillRect(0, HEIGHT - 10, WIDTH, 10);

  // ceiling
  ctx.fillRect(0, 0, WIDTH, 10);

  // left wall
  ctx.fillRect(0, 0, 10, HEIGHT);

  // right wall
  ctx.fillRect(WIDTH - 10, 0, 10, HEIGHT);
}

/******************Drawing****************/

let lastTime = 0;
function loop(curTime: number) {
  ctx.fillStyle = "#282828";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (lastTime == 0) lastTime = curTime;
  const deltaTime = Math.min(curTime - lastTime, 50);
  lastTime = curTime;
  for (const ball of balls) {
    ball.update(deltaTime / 100);
  }
  for (let i = 0; i < 4; i++) resolveCollisions();
  for (const ball of balls) {
    ball.draw();
  }
  drawWalls();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
