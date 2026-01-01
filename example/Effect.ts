import { Rectangle, Texture } from 'pixi.js';

import { IAssetsManager } from '../src/assets/interfaces/IAssetsManager';
import { Graphic } from '../src/sprite/Graphic';

export class Effect extends Graphic {

    private frameCount: number;
    private currentTextures: Texture[];

    public constructor(
        id: string,
    ) {
        super(id);

        this.frameCount = 0;
        this.currentTextures = [];

    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            const baseTexture = (resourceManager.get(this.id) as Texture).source;

            for(let i = 0; i < 13; i++) {
                this.currentTextures.push(new Texture({ source: baseTexture, frame: new Rectangle(i * 64, 0, 64, 64) }));
            }

            this.setTexture(this.currentTextures[this.frameCount]);

            this.updateGraphicBounds();

            this.setInitialized();

            this.setAnchor({ xOffset: "middle", yPxOffset: -10 });
        }
    }

    updateFrame() {
        this.frameCount++;

        const nextTexture = this.currentTextures.shift();

        if(nextTexture) {
            this.setTexture(nextTexture);
        }
    }

    needFrameUpdate(): boolean {
        if(!super.needFrameUpdate()) return false;

        if(this.currentTextures.length === 0) {
            this.dispose();
        }

        return this.currentTextures.length > 0;
    }
}
