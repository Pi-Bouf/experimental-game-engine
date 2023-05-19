import { Action } from './enum/Action';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Direction } from './enum/Direction';
import { EventCategory } from '../src/sprite/enum/EventCategory';
import { Graphic } from '../src/sprite/Graphic';
import { IAssetsManager } from '../src/assets/interface/IAssetsManager';
import { Point, Texture } from 'pixi.js';

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
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            const baseTexture = resourceManager.get(this.id).baseTexture;

            this.currentTextures = [
                new Texture(baseTexture, AvatarPositionComputer.getPosition(this.action, this.direction)[0]),
                new Texture(baseTexture, AvatarPositionComputer.getPosition(this.action, this.direction)[1]),
                new Texture(baseTexture, AvatarPositionComputer.getPosition(this.action, this.direction)[2]),
                new Texture(baseTexture, AvatarPositionComputer.getPosition(this.action, this.direction)[3]),
            ];

            this.texture = this.currentTextures[0];

            this.updateBounds();

            this.setInitialized();
        }
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

    updateBounds() {
        super.updateBounds();
    }


    getEventCategory(): EventCategory {
        return EventCategory.FLOOR;
    }
}