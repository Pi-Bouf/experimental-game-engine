import { Texture } from 'pixi.js';

export interface IAssetsManager {
    has(id: string, url: string): boolean;

    get(id: string): Texture;
}
