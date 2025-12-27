import { Sprite } from 'pixi.js';

import { IAssetsManager } from '../../assets/interfaces/IAssetsManager';
import { ICurrentInputs } from '../../events/interface/ICurrentInputs';
import { PRectangle } from "../../geometry";
import { IPosition3D } from '../../geometry/interfaces/IPosition3D';

export interface IGraphic {
    disposed: boolean;
    canBeHovered: boolean;
    canBeClicked: boolean;

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
    updatePosition(): void;
    setPositionUpdated(): void;
    requestPositionUpdate(): void;
    setPosition(position: IPosition3D): void;
    getCurrentPosition(): IPosition3D;

    getGraphicBounds(): PRectangle;
    updateGraphicBounds(): void;
    checkGraphicBounds(graphicBounds: PRectangle): void;

    checkHover(currentInputs: ICurrentInputs): boolean;
    checkInput(currentInputs: ICurrentInputs): boolean;

    getDisplayableObject(): Sprite;

    dispose(): void;
}
