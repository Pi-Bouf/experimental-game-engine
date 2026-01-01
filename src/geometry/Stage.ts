import { Container } from "pixi.js";
import { Viewport } from 'pixi-viewport';

import { Engine } from '../Engine';
import { IResetable } from '../interfaces/IResetable';
import { IGraphic } from '../sprite';
import { PRectangle } from "./PRectangle";

export class Stage implements IResetable {
    private children: IGraphic[];
    private _container: Container<any>;
    private _viewport: Viewport;

    private lastHoverTick: number;
    private minHoverTick: number;

    private _animationFps: number;
    private _animationFpsInterval: number;
    private _lastAnimationTime: number;

    constructor(public engine: Engine) {
        this.children = [];
        this._container = new Container();

        // this.inputManager = new InputManager();

        this.lastHoverTick = 0;
        this.minHoverTick = 30;

        this._animationFps = 25;
        this._animationFpsInterval = 1000 / this._animationFps;

        this._lastAnimationTime = 0;
    }

    public initViewport() {
        const screenWidth = this.engine.renderer.width;
        const screenHeight = this.engine.renderer.height;

        this._viewport = new Viewport({
            worldWidth: screenWidth,
            worldHeight: screenHeight,
            events: this.engine.renderer.events,
            passiveWheel: false,
        });

        this._viewport.drag({
            pressDrag: true
        }).decelerate();

        this._viewport.center.set(screenWidth / 2, screenHeight / 2);

        this._container.addChild(this._viewport);

        setTimeout(() => {
            console.log(this._viewport.worldWidth, this._viewport.position.x);
        }, 3000);
    }

    public update(delta: number) {
        const now = performance.now();

        if(now - this._lastAnimationTime >=  this._animationFpsInterval ) {
            this.animationTick(now);

            this._lastAnimationTime = now;
        }

        this.displayTick(delta);
    }

    public animationTick(now: number) {
        for(const child of this.children) {
            if(child.disposed) {
                continue;
            }

            if (child.needInitialization()) {
                child.initialize(this.engine.assetsManager);
                continue;
            }

            child.checkGraphicBounds(new PRectangle());

            if (!child.needFrameUpdate(now)) continue;

            child.updateFrame();
        }
    }

    public displayTick(delta: number) {
        const now = performance.now();
        
        for(const child of this.children) {
            if(child.disposed) {
                this.removeChild(child);
                continue;
            }

            if (child.needPositionUpdate()) {
                child.updatePosition();
            }

            if (child.needTweenUpdate()) child.updateTween(now);
        }

        // this.checkHovered(now, currentInputs);

        // this.inputManager.flush();

        // Update viewport with elapsed time
        this._viewport.update(delta);
        
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
        this._viewport.addChild(child.getDisplayableObject());
    }

    public removeChild(child: IGraphic) {
        this.children.splice(this.children.indexOf(child), 1);
        this._viewport.removeChild(child.getDisplayableObject());
    }

    public reset() {
        this.children.forEach(child => child.dispose());
        this._viewport.removeChildren();
    }

    public get viewport() {
        return this._viewport;
    }
}
