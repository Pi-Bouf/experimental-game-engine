import { Asset } from './types/Asset';
import { Assets } from 'pixi.js';
import { IAssetsManager } from './interfaces/IAssetsManager';

export class AssetsManager implements IAssetsManager {
    protected _textures: Map<string, Asset | null>;

    constructor(
        protected readonly imageDomain: string,
    ) {
        this._textures = new Map();
    }

    public async init(baseFiles: string[] = []): Promise<void> {
        for (const id of baseFiles) {
            const terrainTexture = await Assets.load(this.imageDomain + id);
            this._textures.set(id, terrainTexture);
        }
    }

    public has(id: string): boolean {
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

    public get<T extends Asset>(id: string): T {
        return this._textures.get(id) as T;
    }

    protected load(id: string) {
        this._textures.set(id, null);

        Assets.load(this.imageDomain + id).then((asset) => {
            this._textures.set(id, asset);
        });
    }
}
