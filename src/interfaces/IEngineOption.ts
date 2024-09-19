import {IAssetsManager} from "../assets";

export interface IEngineOption {
    canvasContainer: HTMLDivElement,
    width: number,
    height: number,
    autoResize: boolean,
    backgroundAlpha: number,
    maxAnimationRate: number,
    maxDisplayRate: number,
    mouseEventFrequency: number,
    images: {
        imageDomain: string,
        baseFiles?: string[]
    },
    assetsManager?: IAssetsManager
}
