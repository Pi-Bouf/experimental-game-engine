import { Rectangle as PRectangle } from 'pixi.js';

export class Rectangle extends PRectangle {
    isEqual(rectangle: PRectangle) {
        return this.x === rectangle.x &&
            this.y === rectangle.y &&
            this.width === rectangle.width &&
            this.height === rectangle.height;
    }
}