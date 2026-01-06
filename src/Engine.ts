import {
    AbstractRenderer, autoDetectRenderer, Container,
    Renderer, Texture, TexturePool, TextureStyle
} from 'pixi.js';

import { AssetsManager, IAssetsManager } from "./assets";
import { Inspector } from './debug';
import { IEngineOption } from './interfaces/IEngineOption';
import { Stage } from "./scene";
import { GameTicker } from "./ticker/GameTicker";

export class Engine {
    public canvasContainer: Element;
    public renderer: Renderer;
    public assetsManager: IAssetsManager;
    public stage: Stage;
    public ticker: GameTicker;
    public externalLoopCallback: () => void;

    constructor(
        private readonly options: IEngineOption,
    ) {
        AbstractRenderer.defaultOptions.resolution = 1;
        // Needed for generated textures to be pixel perfect.
        TexturePool.textureOptions.scaleMode = 'nearest';
        // Needed for all other textures to be pixel perfect.
        TextureStyle.defaultOptions.scaleMode = 'nearest';

        this.assetsManager = this.options.assetsManager ?? new AssetsManager(this.options.images.imageDomain);

        this.stage = new Stage(this, this.options.maxAnimationRate);

        this.ticker = new GameTicker();
        this.ticker.setFps(options.targetFps ?? 60)
            .attach((delta) => {
                this.stage.update(delta);
            });
    }

    public async init() {
        // this.renderer = new WebGPURenderer();
        // await this.renderer.init({
        //     width: this.options.width,
        //     height: this.options.height,
        //     backgroundAlpha: this.options.backgroundAlpha,
        //     antialias: false,
        //     roundPixels: true,
        // });


        this.renderer = await autoDetectRenderer({
            width: this.options.width,
            height: this.options.height,
            backgroundAlpha: this.options.backgroundAlpha,
            antialias: false,
            roundPixels: true,
            resolution: 1,
        });

        this.canvasContainer = this.options.canvasContainer;
        this.canvasContainer.innerHTML = '';
        this.canvasContainer.append(this.renderer.canvas);


        this.stage.initViewport();
        this.ticker.start();

        await this.assetsManager.init(this.options.images.baseFiles);

        if(this.options.inspector === true) {
            new Inspector(this.stage.viewport);
        }
    }

    public generateTexture(object: Container): Texture {
        return this.renderer.generateTexture(object);
    }

    public reset() {
        this.stage.reset();
    }
}
