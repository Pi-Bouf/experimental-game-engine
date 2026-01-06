import { Texture } from "pixi.js";

import { Graphic } from "../sprite";

export class GraphicDebugWhite extends Graphic {
    constructor() {
        super(`${Math.random() * 255}_${Math.random() * 255}_${Math.random() * 255}_GRAPHIC_DEBUG_WHITE`, { texture: Texture.WHITE });
    }
}