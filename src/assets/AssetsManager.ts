import { Assets, Spritesheet, Texture } from 'pixi.js';
import { IAsset } from './interface/IAsset';
import { IAssetsManager } from './interface/IAssetsManager';

export class AssetsManager implements IAssetsManager {
    private _textures: Map<string, IAsset<Texture | Spritesheet> | null>;
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

        if (texture === null) {
            return false;
        }

        if (texture === undefined) {
            this.load(id);
            return false;
        }

        return true;
    }

    get(id: string): Texture {
        //@ts-ignore
        return this._textures.get(id) as Texture;
    }

    private load(id: string) {
        this._textures.set(id, null);

        Assets.load(this.imageDomain + id).then((asset) => {
            this._textures.set(id, asset);
        });
    }
}
