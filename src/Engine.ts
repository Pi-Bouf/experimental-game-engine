import {
    AbstractRenderer, autoDetectRenderer,
    Renderer, TexturePool,
    Ticker
} from 'pixi.js';

import { AssetsManager,IAssetsManager } from "./assets";
import { Stage } from './geometry';
import { IEngineOption } from './interfaces/IEngineOption';
import { DoubleTicker } from './ticker/DoubleTicker';

export class Engine {
    public canvasContainer: Element;
    public renderer: Renderer;
    public assetsManager: IAssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;
    public externalLoopCallback: () => void;

    constructor(
        private readonly options: IEngineOption,
    ) {
        AbstractRenderer.defaultOptions.resolution = 1;
        TexturePool.textureOptions.scaleMode = 'nearest';
        Ticker.shared.autoStart = false;
        Ticker.shared.stop();
        Ticker.shared.maxFPS = 1;
    }

    public async init() {
        this.renderer = await autoDetectRenderer({
            width: this.options.width,
            height: this.options.height,
            backgroundAlpha: this.options.backgroundAlpha,
        });

        this.canvasContainer = this.options.canvasContainer;
        this.canvasContainer.innerHTML = '';
        this.canvasContainer.append(this.renderer.canvas);

        this.stage = new Stage(this);
        this.ticker = new DoubleTicker(this.options.maxAnimationRate, this.options.maxDisplayRate);
        this.ticker.attachCallbacks(() => this.stage.animationTick(), () => {
            if(this.externalLoopCallback) { this.externalLoopCallback(); }

            this.stage.displayTick();
        });

        this.assetsManager = this.options.assetsManager ?? new AssetsManager(this.options.images.imageDomain);

        //new PixiInspector(this.stage);

        await this.assetsManager.init(this.options.images.baseFiles);
    }

    // public generateTexture(object: DisplayObject): Texture {
    //     return this.renderer.generateTexture(object);
    // }

    public reset() {
        this.stage.reset();
    }
}
