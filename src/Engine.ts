import { AssetsManager } from './assets/AssetsManager';
import { BaseTexture, DisplayObject, RenderTexture, Renderer, SCALE_MODES, Ticker, settings } from 'pixi.js';
import { DoubleTicker } from './ticker/DoubleTicker';
import {IAssetsManager} from "./assets";
import { IEngineOption } from './interfaces/IEngineOption';
import { Stage } from './geometry/Stage';

export class Engine {
    public canvasContainer: HTMLDivElement;
    public renderer: Renderer;
    public assetsManager: IAssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;

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
        this.ticker.attachCallbacks(() => this.stage.animationTick(), () => this.stage.displayTick());

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
