import { EventCategory } from '../src/sprite/enum/EventCategory';
import { Graphic } from '../src/sprite/Graphic';
import { IAssetsManager } from '../src/assets/interface/IAssetsManager';
import { Point, Rectangle, Texture } from 'pixi.js';

export class Archer extends Graphic {

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            const baseTexture = resourceManager.get(this.id).baseTexture;

            const randomZoneX = Math.random() * 16 | 0;
            const randomZoneY = Math.random() * 8 | 0;

            const frame = new Rectangle(randomZoneX * 144, randomZoneY * 144, 144, 144);
            this.texture = new Texture(baseTexture, frame);

            this.scale.set(0.5);

            this.updateBounds();
            this.generateHitMap();

            this.setInitialized();
        }
    }

    updateFrame() {
        super.updateFrame();
    }

    needFrameUpdate(): boolean {
        return false;
    }

    updateTween(now: number) {
        super.updateTween(now);
    }

    updatePosition(stageOffset: Point) {
        super.updatePosition(stageOffset);
    }

    updateBounds() {
        super.updateBounds();
    }


    getEventCategory(): EventCategory {
        return EventCategory.FLOOR;
    }
}