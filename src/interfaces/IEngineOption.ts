import { IAssetsManager } from "../assets";

export interface IEngineOption {
    canvasContainer: HTMLElement,
    width: number,
    height: number,
    autoResize: boolean,
    backgroundAlpha: number,
    targetFps: number,
    maxAnimationRate: number,
    mouseEventFrequency: number,
    inspector?: boolean,
    images: {
        imageDomain: string,
        baseFiles?: string[]
    },
    assetsManager?: IAssetsManager
}
