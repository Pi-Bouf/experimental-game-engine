import { BaseTexture, DisplayObject, Renderer, RenderTexture, SCALE_MODES, settings,Ticker } from 'pixi.js';

import { IAssetsManager } from "./assets";
import { AssetsManager } from './assets/AssetsManager';
import { Stage } from './geometry/Stage';
import { IEngineOption } from './interfaces/IEngineOption';
import { DoubleTicker } from './ticker/DoubleTicker';

export class Engine {
    public canvasContainer: HTMLDivElement;
    public renderer: Renderer;
    public assetsManager: IAssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;
    public externalLoopCallback: () => void;

    constructor(
        private options: IEngineOption,
    ) {
        settings.RESOLUTION = 1;
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
        Ticker.shared.stop();
        Ticker.shared.autoStart = false;
        Ticker.shared.maxFPS = 1;

        this.renderer = new Renderer({
            width: options.width,
            height: options.height,
            backgroundAlpha: options.backgroundAlpha,
        });

        this.canvasContainer = options.canvasContainer;
        this.canvasContainer.innerHTML = '';
        this.canvasContainer.append(this.renderer.view as HTMLCanvasElement);

        this.stage = new Stage(this);
        this.ticker = new DoubleTicker(options.maxAnimationRate, options.maxDisplayRate);
        this.ticker.attachCallbacks(() => this.stage.animationTick(), () => {
            if(this.externalLoopCallback) { this.externalLoopCallback(); }

            this.stage.displayTick();
        });

        this.assetsManager = options.assetsManager ?? new AssetsManager(this.options.images.imageDomain);

        //new PixiInspector(this.stage);
    }

    public async init() {
        await this.assetsManager.init(this.options.images.baseFiles);
    }

    public generateTexture(object: DisplayObject): RenderTexture {
        return this.renderer.generateTexture(object);
    }

    public reset() {
        this.stage.reset();
    }
}
