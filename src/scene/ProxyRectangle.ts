import { Rectangle } from 'pixi.js';

export class ProxyRectangle extends Rectangle {
    isEqual(rectangle: ProxyRectangle) {
        return this.x === rectangle.x &&
            this.y === rectangle.y &&
            this.width === rectangle.width &&
            this.height === rectangle.height;
    }
}
