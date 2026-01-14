import { Texture } from 'pixi.js';

import { Graphic, IAssetsManager } from "../src";
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

            this.setTexture(this.currentTextures[0]);

            this.updateGraphicBounds();

            this.setInitialized();

            this.setAnchor({ xOffset: "middle", yPxOffset: -53 });
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
        
        this.setTexture(this.currentTextures[this.frameCount % 4]);
        
        if (this.frameCount > 1000) {
            this.frameCount = 0;
        }
    }

    needFrameUpdate(now: number): boolean {
        if(!super.needFrameUpdate(now)) return false;
        // return false;
        return this.currentTextures.length > 1;
    }
}
