import { Rectangle } from 'pixi.js';

export class PRectangle extends Rectangle {
    isEqual(rectangle: PRectangle) {
        return this.x === rectangle.x &&
            this.y === rectangle.y &&
            this.width === rectangle.width &&
            this.height === rectangle.height;
    }
}
