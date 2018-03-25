let thresh = 10;
let padding = 8;
let pixelSize = 2;
let image1;
let edges;
let url;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  noStroke();
  background(200);
  text("hello", width / 2, height / 2);
  url = 'https://cdn.glitch.com/42576848-c136-4622-9b2c-8fa4c65d1775%2Fcat.jpg?1521915726155';
  loadImage(url, function(data) {
    image1 = data;
    //   image(image1, 0 ,0 );
    // findEdge(image1);
  });

}

var draw = () => {
  if (frameCount % 120 == 0) {
    background(0);
    thresh = mouseX;
    //print(thresh);
    findEdge(image1, thresh);
    for (let i = 0; i< edges.length; i ++){
      fill(255);
      push();
      translate(width / 2, height / 2);
      rect(edges[i].x, edges[i].y, 4, 4);
      pop();
    };
  }

}

function findEdge(imageData, threshold) {
  if (imageData != undefined) {
    image(imageData, 0, 0);
    let img = imageData;
    img.loadPixels();
    edges = [];

    for (let x = padding; x < img.width - padding; x += 4) {
      for (let y = padding; y < img.height - padding; y += 4) {
        let rIndex = (x + y * img.width) * 4;
        let r = img.pixels[rIndex];
        let g = img.pixels[rIndex + 1];
        let b = img.pixels[rIndex + 2];
        for (let x2 = x; x2 < x + padding; x2 += 4) {
          for (let y2 = y; y2 < y + padding; y2 += 4) {
            let r2Index = (x2 + y2 * img.width) * 4;
            let r2 = img.pixels[r2Index];
            let g2 = img.pixels[r2Index + 1];
            let b2 = img.pixels[r2Index + 2];
            let d = dist(r, g, b, r2, g2, b2);

            if (d >= threshold) {
              let edge = {
                x: x2,
                y: y2
              }
              edges.push(edge);
            }
          }
        }
      }
    }
  }
}