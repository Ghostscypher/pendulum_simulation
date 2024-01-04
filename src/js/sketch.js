let len = 300;

let angle;
let angle_2;
let blob;
let blob_2;
let origin;
let origin_2;
let radius_1 = 200;
let radius_2 = 200;
let mass_1 = 20;
let mass_2 = 20;

let accelleration;
let accelleration_2;
let angular_velocity = 0.0599;
let angular_velocity_2 = 0.0599;

let gravity = 1;
// let friction = 0.999;
let friction = 1;

let path = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    blob = createVector(windowWidth / 2, 200);
    origin = createVector(windowWidth / 2, 200);
    angle = PI / 4;

    blob_2 = createVector(windowWidth / 2, 200);
    origin_2 = createVector(windowWidth / 2, 200);
    angle_2 = PI / 8;
}

function singlePendulum() {
    background(0);
    translate(0, 0);

    let force = gravity * sin(angle);
    accelleration = -1 * force / len;
    angular_velocity += accelleration;
    angular_velocity *= friction;
    angle += angular_velocity;

    blob.x = origin.x + len * sin(angle);
    blob.y = origin.y + len * cos(angle);

    // Draw the blob   
    stroke(255);
    strokeWeight(4);
    line(origin.x, origin.y, blob.x, blob.y);

    // Draw the origin
    stroke(255, 0, 0);
    strokeWeight(20);
    point(blob.x, blob.y);

    // Draw the path
    path.push(createVector(blob.x, blob.y));

    // If path is too long, remove the first element
    if (path.length > 1000) {
        path.splice(0, 1);
    }

    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();
}

function doublePendulum() {
    background(0);
    translate(width / 2, 300);

    let x1 = radius_1 * sin(angle);
    let y1 = radius_1 * cos(angle);

    let x2 = x1 + radius_2 * sin(angle_2);
    let y2 = y1 + radius_2 * cos(angle_2);

    // Acceleration of the first pendulum
    let num1 = -gravity * (2 * mass_1 + mass_2) * sin(angle);
    let num2 = -mass_2 * gravity * sin(angle - 2 * angle_2);
    let num3 = -2 * sin(angle - angle_2) * mass_2;
    let num4 = angular_velocity_2 * angular_velocity_2 * radius_2 + angular_velocity * angular_velocity * radius_1 * cos(angle - angle_2);
    let den = radius_1 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle - 2 * angle_2));
    accelleration = (num1 + num2 + num3 * num4) / den;

    // Acceleration of the second pendulum
    num1 = 2 * sin(angle - angle_2);
    num2 = (angular_velocity * angular_velocity * radius_1 * (mass_1 + mass_2));
    num3 = gravity * (mass_1 + mass_2) * cos(angle);
    num4 = angular_velocity_2 * angular_velocity_2 * radius_2 * mass_2 * cos(angle - angle_2);
    den = radius_2 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle - 2 * angle_2));
    accelleration_2 = (num1 * (num2 + num3 + num4)) / den;

    angular_velocity += accelleration;
    angular_velocity *= friction;
    angle += angular_velocity;

    angular_velocity_2 += accelleration_2;
    angular_velocity_2 *= friction;
    angle_2 += angular_velocity_2;

    // Draw path of the second pendulum
    path.push(createVector(x2, y2));

    // If path is too long, remove the first element
    if (path.length > 10000) {
        path.splice(0, 1);
    }

    // Draw the first line
    stroke(255);
    strokeWeight(4);
    line(0, 0, x1, y1);
    fill(255);
    ellipse(x1, y1, mass_1, mass_1);

    // Draw the second line
    stroke(255);
    strokeWeight(4);
    line(x1, y1, x2, y2);
    fill(255);
    ellipse(x2, y2, mass_2, mass_2);

    // Draw the path
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();
}

let display_double = true;

function keyPressed() {
    if (key == 'r' || key == 'R') {
        path = [];
        angle = PI / 4;
        angle_2 = PI / 4;
        angular_velocity = 0;
        angular_velocity_2 = 0;

        blob.x = origin.x + len * sin(angle);
        blob.y = origin.y + len * cos(angle);

        blob_2.x = blob.x + len * sin(angle_2);
        blob_2.y = blob.y + len * cos(angle_2);
    }

    if (key == 'd' || key == 'D') {
        display_double = !display_double;
        path = [];

        angular_velocity = 0.0599;
        angular_velocity_2 = 0.0599;

        blob.x = origin.x + len * sin(angle);
        blob.y = origin.y + len * cos(angle);

    }
}

function draw() {
    if (display_double) {
        doublePendulum();
    } else {
        singlePendulum();
    }
}