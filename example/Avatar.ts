import { Point, Texture } from 'pixi.js';

import { IAssetsManager } from '../src/assets/interfaces/IAssetsManager';
import { EventCategory } from '../src/sprite/enum/EventCategory';
import { Graphic } from '../src/sprite/Graphic';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Action } from './enum/Action';
import { Direction } from './enum/Direction';

export class Avatar extends Graphic {

    private frameCount: number;
    private currentTextures: Texture[];

    public constructor(
        id: string,
        private action: Action,
        private direction: Direction,
    ) {
        super(id);

        this.frameCount = 0;
        this.currentTextures = [];

        // this.anchor.set(0.5, 1);
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            const baseTexture = (resourceManager.get(this.id) as Texture).source;

            this.currentTextures = [
                new Texture({ source: baseTexture, frame: AvatarPositionComputer.getPosition(this.action, this.direction)[0] }),
                new Texture({ source: baseTexture, frame: AvatarPositionComputer.getPosition(this.action, this.direction)[1] }),
                new Texture({ source: baseTexture, frame: AvatarPositionComputer.getPosition(this.action, this.direction)[2] }),
                new Texture({ source: baseTexture, frame: AvatarPositionComputer.getPosition(this.action, this.direction)[3] }),
            ];

            this.texture = this.currentTextures[0];

            this.updateGraphicBounds();

            this.setInitialized();

            const offset = -53;

            this.setAnchorPoint('middle', offset);
            // this.drawAnchorPoint();
            // this.filters = [ReplaceAlphaFilter()];
        }
    }

    public needTweenUpdate(): boolean {
        return false;
        // const test = super.needTweenUpdate();
        //
        // if(!test) {
        //     this.addTween(new TranslateTween(this, 2000, { positions: new Position3D(Math.random() * 1300 | 0, Math.random() * 700 | 0) }));
        // }
        //
        // return true;
    }

    updateFrame() {
        this.frameCount++;

        this.texture = this.currentTextures[this.frameCount % 4];

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
