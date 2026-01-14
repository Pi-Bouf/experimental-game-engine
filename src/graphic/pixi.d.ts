import 'pixi.js';

declare module 'pixi.js' {
    interface TextureSource {
        hitMap?: Uint32Array;
    }
}