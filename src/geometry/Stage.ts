import { Container, Sprite } from 'pixi.js';

import { Engine } from '../Engine';
import { ICurrentInputs, InputManager } from '../events';
import { IResetable } from '../interfaces/IResetable';
import { IGraphic } from '../sprite';
import { GeometryManager } from './GeometryManager';

export class Stage implements IResetable {
    private children: IGraphic[];
    private _container: Container<Sprite>;

    private inputManager: InputManager;
    private geometryManager: GeometryManager;

    private lastHoverTick: number;
    private minHoverTick: number;

    constructor(public engine: Engine) {
        this.children = [];
        this._container = new Container({ isRenderGroup: false, interactive: false, interactiveChildren: false, sortableChildren: true });

        this._container.removeChild();

        this.inputManager = new InputManager();
        this.geometryManager = new GeometryManager(this);

        this.lastHoverTick = 0;
        this.minHoverTick = 30;

        this.geometryManager.checkStageSize();
    }

    public animationTick() {
        for(const child of this.children) {
            if(child.disposed) {
                continue;
            }

            if (child.needInitialization()) {
                child.initialize(this.engine.assetsManager);
                continue;
            }

            child.checkGraphicBounds(this.geometryManager.stageBounds);

            if (!child.needFrameUpdate()) continue;

            child.updateFrame();
        }
    }

    public displayTick() {
        const now = performance.now();

        const currentInputs: ICurrentInputs = this.inputManager.getCurrentInputs();

        this.geometryManager.update(currentInputs);

        if (this.geometryManager.needSizeUpdate) {
            this.engine.renderer.resize(this.geometryManager.stageBounds.width, this.geometryManager.stageBounds.height);
        }

        for(const child of this.children) {
            if(child.disposed) {
                this.removeChild(child);
                continue;
            }
            
            if (child.needPositionUpdate() || this.geometryManager.needPositionUpdate) {
                child.updatePosition(this.geometryManager.stageOffset);
            }

            if (child.needTweenUpdate()) child.updateTween(now);
        }

        // this.checkHovered(now, currentInputs);

        this.inputManager.flush();
        this.geometryManager.flush();

        // console.log(this.container.children);
        this.engine.renderer.render(this._container);
    }

    private checkHovered(/*now: number, currentInputs: ICurrentInputs*/) {
        // if (now - this.lastHoverTick > this.minHoverTick) {
        //     const hovered = this.children.find((child) => {
        //         if (!child.visible) return false;
        //         return child.getEventCategory() !== EventCategory.NONE && child.checkHover(currentInputs);
        //     });
        //
        //     if (hovered) {
        //         document.body.style.cursor = 'pointer';
        //     } else {
        //         document.body.style.cursor = 'default';
        //     }
        //
        //     this.lastHoverTick = now;
        // }
    }

    public addChild(child: IGraphic) {
        this.children.push(child);
        this._container.addChild(child.getDisplayableObject());
    }

    public removeChild(child: IGraphic) {
        this.children.splice(this.children.indexOf(child), 1);
        this._container.removeChild(child.getDisplayableObject());
    }

    public reset() {
        this.children.forEach(child => child.dispose());
        this._container.removeChildren();
    }

    public get container(){
        return this._container;
    }
}
