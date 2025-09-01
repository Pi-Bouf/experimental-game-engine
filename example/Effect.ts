import { Point, Rectangle, Texture } from 'pixi.js';

import { IAssetsManager } from '../src/assets/interfaces/IAssetsManager';
import { EventCategory } from '../src/sprite/enum/EventCategory';
import { Graphic } from '../src/sprite/Graphic';

export class Effect extends Graphic {

    private frameCount: number;
    private currentTextures: Texture[];

    public constructor(
        id: string,
    ) {
        super(id);

        this.frameCount = Math.random() * 13 | 0;
        this.currentTextures = [];
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            const baseTexture = (resourceManager.get(this.id) as Texture).source;

            for(let i = 0; i < 13; i++) {
                this.currentTextures.push(new Texture({ source: baseTexture, frame: new Rectangle(i * 64, 0, 64, 64) }));
            }

            this.texture = this.currentTextures[this.frameCount];

            this.updateGraphicBounds();

            this.setInitialized();
        }
    }

    updateFrame() {
        this.frameCount++;

        this.texture = this.currentTextures[this.frameCount % 13];

        if (this.frameCount > 1000) {
            this.frameCount = 0;
        }
    }

    needFrameUpdate(): boolean {
        // return false;
        return this.currentTextures.length > 1;
    }

    updateTween(now: number) {
        super.updateTween(now);
    }

    updatePosition(stageOffset: Point) {
        super.updatePosition(stageOffset);
    }

    updateGraphicBounds() {
        super.updateGraphicBounds();
    }


    getEventCategory(): EventCategory {
        return EventCategory.FLOOR;
    }
}
