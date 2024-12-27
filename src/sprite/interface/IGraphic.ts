import { Point, Rectangle, Sprite } from 'pixi.js';

import { IAssetsManager } from '../../assets/interfaces/IAssetsManager';
import { ICurrentInputs } from '../../events/interface/ICurrentInputs';
import { IPosition3D } from '../../geometry/interfaces/IPosition3D';
import { EventCategory } from '../enum/EventCategory';

export interface IGraphic extends Sprite {
    needInitialization(): boolean;
    initialize(resourceManager: IAssetsManager): void;
    setInitialized(): void;
    requestInitialization(): void;

    needFrameUpdate(): boolean;
    updateFrame(): void;
    setFrameUpdated(): void;
    requestFrameUpdate(): void;

    needTweenUpdate(): boolean;
    updateTween(now: number): void;

    needPositionUpdate(): boolean;
    updatePosition(point: Point): void;
    setPositionUpdated(): void;
    requestPositionUpdate(): void;
    setPosition3D(position3D: IPosition3D): void;
    getCurrentPosition(): IPosition3D;

    getBounds(): Rectangle;
    updateBounds(): void;
    checkBounds(bounds: Rectangle): void;

    checkHover(currentInputs: ICurrentInputs): boolean;
    checkInput(currentInputs: ICurrentInputs): boolean;
    getEventCategory(): EventCategory;

    dispose(): void;
}
