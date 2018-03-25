class EDGE {
  constructor(url, threshold, dens) {
    this.url = url;
    this.image;
    this.edges = [];
    this.threshold = threshold;
  }
  refresh() {
    loadImage(this.url, function(data) {
      this.image = data;
      this.image.loadPixels();
      this.edges = [];
      for (let x = dens; x < this.image.width - dens; x += dens) {
        for (let y = dens; y < this.image.height - dens; y += dens) {
          let rIndex = (x + y * this.image.width) * 4;
          let r = this.image.pixels[rIndex];
          let g = this.image.pixels[rIndex + 1];
          let b = this.image.pixels[rIndex + 2];
          for (let x2 = x; x2 < x + dens; x2 += dens) {
            for (let y2 = y; y2 < y + dens; y2 += dens) {
              let r2Index = (x2 + y2 * this.image.width) * 4;
              let r2 = this.image.pixels[r2Index];
              let g2 = this.image.pixels[r2Index + 1];
              let b2 = this.image.pixels[r2Index + 2];
              let d = dist(r, g, b, r2, g2, b2);
              if (d >= this.threshold) {
                let edge = {
                  x: x2 / dens,
                  y: y2 / dens
                }
                this.edges.push(edge);
              }
            }
          }
        }
      }
    });
  }
}
