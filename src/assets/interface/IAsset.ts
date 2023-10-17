import { Spritesheet, Texture } from 'pixi.js';

export type AllowedAssetType = Texture | Spritesheet;

export interface IAsset<T extends AllowedAssetType> {
    id: string;
    data: T;
}