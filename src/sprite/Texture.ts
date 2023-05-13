import { BaseTexture, Texture as PTexture } from 'pixi.js';

export class Texture extends PTexture {
    public static fromBase64(base64: string) {
        const baseTexture = new BaseTexture(base64);

        return new PTexture(baseTexture);
    }
}