import { Sprite } from 'pixi.js';

import { IAssetsManager } from '../../assets/interfaces/IAssetsManager';
import { ICurrentInputs } from '../../events/interface/ICurrentInputs';
import { ProxyRectangle } from "../../geometry";
import { IPosition3D } from '../../geometry/interfaces/IPosition3D';

export interface IGraphic {
    disposed: boolean;
    canBeHovered: boolean;
    canBeClicked: boolean;

    alpha: number;

    needInitialization(): boolean;
    initialize(resourceManager: IAssetsManager): void;
    setInitialized(): void;
    requestInitialization(): void;

    needFrameUpdate(now: number): boolean;
    updateFrame(): void;

    needTweenUpdate(): boolean;
    updateTween(now: number): void;

    needPositionUpdate(): boolean;
    updatePosition(): void;
    setPositionUpdated(): void;
    requestPositionUpdate(): void;
    setPosition(position: IPosition3D): void;
    getCurrentPosition(): IPosition3D;

    getGraphicBounds(): ProxyRectangle;
    updateGraphicBounds(): void;
    checkGraphicBounds(screenBounds: ProxyRectangle): void;

    checkHover(currentInputs: ICurrentInputs): boolean;
    checkInput(currentInputs: ICurrentInputs): boolean;

    getDisplayableObject(): Sprite;

    dispose(): void;
}
