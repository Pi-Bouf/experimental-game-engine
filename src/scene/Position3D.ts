import { IPosition3D } from './interfaces/IPosition3D';

export class Position3D implements IPosition3D {
    constructor(
        private _x: number = 0,
        private _y: number = 0,
        private _z: number = 0,
    ) {
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }

    public static from(position3D: IPosition3D) {
        return new Position3D(position3D.x, position3D.y, position3D.z);
    }

    public static getDirection(currentPosition: IPosition3D, newPosition: IPosition3D): string {
        const deltaX = currentPosition.x - newPosition.x;
        const deltaY = currentPosition.y - newPosition.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX < 0 ? "e" : "w";
        } else {
            return deltaY < 0 ? "n" : "s";
        }
    }
}