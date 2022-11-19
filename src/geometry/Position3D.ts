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

    static from(position3D: IPosition3D) {
        return new Position3D(position3D.x, position3D.y, position3D.z);
    }
}