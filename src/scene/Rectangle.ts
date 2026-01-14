import { Rectangle as PixiRectangleBase } from 'pixi.js';

export class PixiRectangle extends PixiRectangleBase {
    isEqual(rectangle: PixiRectangle) {
        return this.x === rectangle.x &&
            this.y === rectangle.y &&
            this.width === rectangle.width &&
            this.height === rectangle.height;
    }
}
