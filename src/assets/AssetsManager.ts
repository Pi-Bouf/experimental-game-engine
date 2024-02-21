import { Asset } from './interface/IAsset';
import { Assets } from 'pixi.js';
import { IAssetsManager } from './interface/IAssetsManager';

export class AssetsManager implements IAssetsManager {
    private _textures: Map<string, Asset | null>;
    private _count: number;

    constructor(
        private readonly imageDomain: string,
    ) {
        this._textures = new Map();
        this._count = 0;
    }

    public async init(baseFiles: string[] = []): Promise<void> {
        for (const id of baseFiles) {
            const terrainTexture = await Assets.load(this.imageDomain + 'map/terrain_001.json');
            this._textures.set('map/terrain_001.json', terrainTexture);
        }
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

    get<T extends Asset>(id: string): T {
        return this._textures.get(id) as T;
    }

    private load(id: string) {
        this._textures.set(id, null);

        Assets.load(this.imageDomain + id).then((asset) => {
            this._textures.set(id, asset);
        });
    }
}
