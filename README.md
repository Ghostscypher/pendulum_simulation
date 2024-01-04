# Single and double pendulum simulation

## Introduction

This is a simuation of a single pendulum and a double pendulum. Single pendulum is a simple pendulum with a single mass and a double pendulum is a pendulum with two masses. The double pendulum is a simple physical system that exhibits rich dynamic behavior with a strong sensitivity to initial conditions. The motion of a double pendulum is governed by a set of coupled ordinary differential equations and is chaotic. The double pendulum is a conservative system and its energy is conserved.

## Installation

To run the simulation, simply clone the repository and open the `index.html` file in your browser. Alternatively, you can visit the [GitHub Pages](https://ghostscypher.github.io/pendulum_simulation/src/index.html) for this repository.

## Implementation

For a simple pendulum the equations are simple and are given by:
```javascript
// Simple pendulum
let aAcc = (-g * sin(a) / r) - (k * aVel);
aVel += aAcc;
a += aVel;
```

where `a` is the angle of the pendulum, `aVel` is the angular velocity of the pendulum, `aAcc` is the angular acceleration of the pendulum, `g` is the acceleration due to gravity, `r` is the length of the pendulum and `k` is the damping constant. Damping constant is used to simulate the frictional forces acting on the pendulum.

For a double pendulum the equations are given by:

```javascript
// First pendulum
let num1 = -g * (2 * m1 + m2) * sin(a1);
let num2 = -m2 * g * sin(a1 - 2 * a2);
let num3 = -2 * sin(a1 - a2) * m2;
let num4 = aVel2 * aVel2 * r2 + aVel1 * aVel1 * r1 * cos(a1 - a2);
let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let aAcc1 = (num1 + num2 + (num3 * num4)) / den;

// Second pendulum
num1 = 2 * sin(a1 - a2);
num2 = (aVel1 * aVel1 * r1 * (m1 + m2));
num3 = g * (m1 + m2) * cos(a1);
num4 = aVel2 * aVel2 * r2 * m2 * cos(a1 - a2);
den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let aAcc2 = (num1 * (num2 + num3 + num4)) / den;

// Update the velocities and angles
aVel1 += aAcc1;
aVel1 *= k;

aVel2 += aAcc2;
aVel2 *= k;

a1 += aVel1;
a2 += aVel2;
```

where `a1` and `a2` are the angles of the first and second pendulum respectively, `aVel1` and `aVel2` are the angular velocities of the first and second pendulum respectively, `aAcc1` and `aAcc2` are the angular accelerations of the first and second pendulum respectively, `g` is the acceleration due to gravity, `r1` and `r2` are the lengths of the first and second pendulum respectively, `m1` and `m2` are the masses of the first and second pendulum respectively. The damping constant `k` is used to simulate the frictional forces acting on the pendulum.

For more info you can visit [Chaotic Double Pendulum](https://www.myphysicslab.com/pendulum/double-pendulum-en.html).

## Usage

1. To pause the simulation, press the `p` key.
2. To resume the simulation, press the `p` key.
3. To reset the simulation, press the `r` key.
4. To switch between single and double pendulum, press the `d` key.

## Demo

<img src="https://raw.githubusercontent.com/ghostscypher/pendulum_simulation/output/demo.gif" alt="Pendulum Simulation">

## References

1. [Double Pendulum](https://en.wikipedia.org/wiki/Double_pendulum)
2. [Chaotic Double Pendulum](https://www.myphysicslab.com/pendulum/double-pendulum-en.html)
3. [Fractals](https://en.wikipedia.org/wiki/Fractal)
4. [P5 JS](https://p5js.org/)
5. [P5 JS Reference](https://p5js.org/reference/)
6. [P5 JS Examples](https://p5js.org/examples/)
7. [P5 JS Web Editor](https://editor.p5js.org/)
8. [Coding train - P5 JS Tutorials](https://www.youtube.com/user/shiffman/playlists?view=50&sort=dd&shelf_id=14)
9. [The Nature of Code](https://natureofcode.com/)
10. [The Coding Train](https://thecodingtrain.com/)
11. [The coding train - Single Pendulum Simulation](https://www.youtube.com/watch?v=NBWMtlbbOag&ab_channel=TheCodingTrain)
12. [The coding train - Double Pendulum](https://www.youtube.com/watch?v=uWzPe_S-RVE&ab_channel=TheCodingTrain)