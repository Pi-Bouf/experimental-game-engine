import { EventCategory } from '../enum/EventCategory';
import { IAssetsManager } from '../../assets/interface/IAssetsManager';
import { ICurrentEvents } from '../../events/interface/ICurrentEvents';
import { IPosition3D } from '../../geometry/interfaces/IPosition3D';
import { Point, Rectangle, Sprite } from 'pixi.js';

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
    setPosition(position3D: IPosition3D): void;
    getCurrentPosition(): IPosition3D;

    getBounds(): Rectangle;
    updateBounds(): void;
    checkBounds(bounds: Rectangle): void;

    checkEvents(currentEvents: ICurrentEvents): boolean;
    getEventCategory(): EventCategory;

    dispose(): void;
}
