import { AssetsManager } from './assets/AssetsManager';
import { DoubleTicker } from './ticker/DoubleTicker';
import { IEngineOption } from './interfaces/IEngineOption';
import { Renderer, SCALE_MODES, settings } from 'pixi.js';
import { Stage } from './geometry/Stage';

export class Engine {
    public canvasContainer: HTMLElement;
    public renderer: Renderer;
    public assetsManager: AssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;

    constructor(
        private options: IEngineOption,
    ) {
        settings.RESOLUTION = 1;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;

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

        this.assetsManager = new AssetsManager(this.options.images.imageDomain);

        // new PixiInspector(this.stage);
    }

    public async init() {
        await this.assetsManager.init();
    }
}
