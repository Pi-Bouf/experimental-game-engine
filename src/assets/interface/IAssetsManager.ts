import { Spritesheet, Texture } from 'pixi.js';

export interface IAssetsManager {
    has(id: string): boolean;

    get(id: string): Texture | Spritesheet;
}
