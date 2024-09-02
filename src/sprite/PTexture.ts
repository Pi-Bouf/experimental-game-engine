import { BaseTexture, Texture } from 'pixi.js';

export class PTexture extends Texture {
    public static fromBase64(base64: string) {
        const baseTexture = new BaseTexture(base64);

        return new PTexture(baseTexture);
    }
}
