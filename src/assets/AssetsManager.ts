import { IAssetsManager } from './interface/IAssetsManager';
import { Texture } from 'pixi.js';

export class AssetsManager implements IAssetsManager {
    private _textures: Map<string, Texture>;
    private _count: number;

    constructor(
        private readonly imageDomain: string,
    ) {
        this._textures = new Map();
        this._count = 0;
    }

    public async init(): Promise<void> {
        // Load base files
    }

    has(id: string): boolean {
        const texture = this._textures.get(id);

        if (texture === undefined) {
            this._textures.set(id, Texture.from(this.imageDomain + id));
            return false;
        }

        if (texture.valid) {
            return true;
        }

        return false;
    }

    get(id: string): Texture {
        return this._textures.get(id);
    }
}
