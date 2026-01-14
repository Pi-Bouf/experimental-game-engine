import { Graphics, ImageSource, Point, Sprite, Texture } from 'pixi.js';

import { AssetTexture } from '../assets';
import { IAssetsManager } from '../assets/interfaces/IAssetsManager';
import { ReplaceAlphaFilter } from "../debug/filters/ReplaceAlphaFilter";
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { IPosition3D, Position3D, ProxyRectangle } from "../scene";
import { IGraphic } from './interface/IGraphic';
import { ITween, Tween } from "./tween";

export type AnchorOptions = { xOffset?: 'left' | 'right' | 'middle', yPxOffset?: number };
export type ScaleOptions = { x?: number, y?: number };
export type EventOptions = { canBeHovered?: boolean, canBeClicked?: boolean };
export type AnimationOptions = { fps?: number };
export type GraphicOptions = { texture?: Texture, anchor?: AnchorOptions, scale?: ScaleOptions, position?: IPosition3D, event?: EventOptions, animation?: AnimationOptions };

export abstract class Graphic implements IGraphic {
    protected id: string;
    private position3D: IPosition3D;
    private graphicBounds: ProxyRectangle;

    private _followedGraphic: Graphic;

    private _disposed = false;

    private _sprite: Sprite;
    private _tween: ITween;

    private _animationFps: number;
    private _animationFpsInterval: number;
    private _lastAnimationTime: number;

    private _canBeHovered: boolean;
    private _canBeClicked: boolean;
    private _initialized: boolean;
    private _positionUpdated: boolean;
    private _frameUpdated: boolean;

    protected constructor(id: string, options?: GraphicOptions) {
        // Default options
        const defaultOptions: GraphicOptions = {
            anchor: { xOffset: 'middle' as const, yPxOffset: 0 },
            scale: { x: 1, y: 1 },
            position: new Position3D(0, 0, 0),
            event: { canBeHovered: false, canBeClicked: false },
            animation: { fps: 10 }
        };

        // Merge provided options with defaults
        const mergedOptions: GraphicOptions = {
            texture: options?.texture,
            anchor: options?.anchor ? { ...defaultOptions.anchor, ...options.anchor } : defaultOptions.anchor,
            scale: options?.scale ? { ...defaultOptions.scale, ...options.scale } : defaultOptions.scale,
            position: options?.position ?? defaultOptions.position,
            event: options?.event ? { ...defaultOptions.event, ...options.event } : defaultOptions.event,
            animation: options?.animation ? { ...defaultOptions.animation, ...options.animation } : defaultOptions.animation,
        };

        this.id = id;
        this.position3D = mergedOptions.position;
        this.graphicBounds = new ProxyRectangle();

        this._sprite = new Sprite(mergedOptions.texture);
        this._sprite.visible = false;

        this.setVisible(false)
            .setAnchor(mergedOptions.anchor)
            .setScale(mergedOptions.scale)
            .setPosition(mergedOptions.position)
            .setEvent(mergedOptions.event)
            .setAnimationFps(mergedOptions.animation.fps);

        // States
        this._initialized = false;
        this._positionUpdated = true;
        this._frameUpdated = true;

        // Events
        this._disposed = false;
    }

    public needInitialization() {
        return !this._initialized;
    }

    public setInitialized(): void {
        this._initialized = true;
    }

    public setScale({ x, y }: ScaleOptions = { x: 1, y: 1 }) {
        this._sprite.scale.set(x, y ?? x);

        this.updateGraphicBounds();

        return this;
    }

    public setAnchor({ xOffset, yPxOffset }: AnchorOptions = { xOffset: 'middle', yPxOffset: 0 }) {
        switch (xOffset) {
            case 'left':
                this._sprite.anchor.set(0, (this._sprite.height + yPxOffset) / this._sprite.height);
                break;
            case 'right':
                this._sprite.anchor.set(1, (this._sprite.height + yPxOffset) / this._sprite.height);
                break;
            case 'middle':
                this._sprite.anchor.set(0.5, (this._sprite.height + yPxOffset) / this._sprite.height);
        }

        this.updateGraphicBounds();

        return this;
    }

    public setEvent(event: EventOptions = { canBeHovered: false, canBeClicked: false }) {
        this._canBeHovered = event.canBeHovered;
        this._canBeClicked = event.canBeClicked;

        return this;
    }

    public setAnimationFps(fps: number) {
        this._animationFps = fps;
        this._animationFpsInterval = 1000 / fps;

        return this;
    }

    public setTexture(texture: Texture) {
        if(!this._sprite) {
            console.warn('Attempt to set a texture to a non existing sprite.', this.id);
            return;
        }

        this._sprite.texture = texture;
    }

    public setVisible(visible: boolean) {
        this._sprite.visible = visible;
        return this;
    }

    public resetFilters() {
        this._sprite.filters = [];

        return this;
    }

    protected addDebugFilter() {
        this._sprite.filters = [ReplaceAlphaFilter()];

        return this;
    }

    /** @deprecated We can't add child to sprite */
    public drawAnchorPoint(color: number = 0x00ff00) {
        const point = new Graphics()
            .rect(-2, 0, 4, 4)
            .fill({ color });

        this._sprite.addChild(point);

        console.info('Display inner border', this.id);
    }

    protected drawInnerBorder() {
        const width = this._sprite.texture.width;
        const height = this._sprite.texture.height;

        const border = new Graphics()
            .moveTo(1, 1)
            .lineTo(width, 1)
            .lineTo(width, height)
            .lineTo(1, height)
            .lineTo(1, 1)
            .stroke({ color: 0x00ff00, pixelLine: true });

        console.log('Display inner border', border);

        // TODO to fix that
        // this.addChild(border);
    }

    public requestInitialization(): void {
        this._initialized = false;
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            this._sprite.texture = resourceManager.get<AssetTexture>(this.id);
            this.updateGraphicBounds();
            // this.generateHitMap();

            this.setInitialized();
        }
    }

    public needFrameUpdate(now: number): boolean {
        if(now - this._lastAnimationTime < this._animationFpsInterval) {
            return false;
        }

        this._lastAnimationTime = now;

        return true;
    }

    public updateFrame(): void {
        console.warn('Try to update frame on static graphic. Check you needFrameUpdate() function.');
    }

    public needTweenUpdate(): boolean {
        return this._tween !== undefined && !this._tween.complete;
    }

    public updateTween(now: number): void {
        this._tween.update(now);
    }

    public addTween(_tween: Tween) {
        this._tween = _tween;
    }

    public setPositionUpdated(): void {
        this._positionUpdated = true;
    }

    public requestPositionUpdate(): void {
        this._positionUpdated = false;
    }

    public needPositionUpdate(): boolean {
        return !this._positionUpdated || this._followedGraphic !== undefined;
    }

    public setPosition(position: IPosition3D = { x: 0, y: 0, z: 0 }) {
        this.position3D = position;

        this.requestPositionUpdate();

        return this;
    }

    public updatePosition(): void {
        if(this._followedGraphic !== undefined) {
            // TODO fix that
            const followedPosition = this._followedGraphic.getCurrentPosition();
            this._sprite.position.set(followedPosition.x + this.position3D.x | 0, followedPosition.y + this.position3D.y | 0);
            this._sprite.zIndex = this._followedGraphic.position3D.z + this.position3D.z;
        } else {
            this._sprite.position.set(this.position3D.x | 0, this.position3D.y | 0);
            this._sprite.zIndex = this.position3D.z;
        }

        this.setPositionUpdated();
        this.updateGraphicBounds();
    }

    getCurrentPosition(): IPosition3D {
        return this.position3D;
    }

    public getGraphicBounds() {
        return this.graphicBounds;
    }

    public updateGraphicBounds() {
        if(this._disposed) return this;
        
        this.graphicBounds = new ProxyRectangle(
            this._sprite.position.x - (this._sprite.anchor.x * (this._sprite.texture.width * this._sprite.scale.x)),
            this._sprite.position.y - (this._sprite.anchor.y * (this._sprite.texture.height * this._sprite.scale.y)),
            this._sprite.texture.width * this._sprite.scale.x,
            this._sprite.texture.height * this._sprite.scale.y
        );

        return this;
    }

    public checkGraphicBounds(/* graphicBounds: ProxyRectangle */): void {
        // TODO fix this
        this._sprite.visible = true;
    }

    public follow(graphic: Graphic) {
        this._followedGraphic = graphic;

        return this;
    }

    public unfollow() {
        this._followedGraphic = undefined;

        return this;
    }

    public checkInput(currentInputs: ICurrentInputs): boolean {
        if (!this.graphicBounds) return false;

        if (!this.graphicBounds.contains(currentInputs.currentCursor.x, currentInputs.currentCursor.y)) return false;

        if (this.graphicBounds.width < 2 || this.graphicBounds.height < 2) return false;

        if (!this._sprite.texture.source.hitMap) this.generateHitMap();

        const localX = (currentInputs.currentCursor.x - this.graphicBounds.x) / this._sprite.scale.x;
        const localY = (currentInputs.currentCursor.y - this.graphicBounds.y) / this._sprite.scale.y;

        const point = new Point(
            (this._sprite.texture.frame.x + localX) | 0,
            (this._sprite.texture.frame.y + localY) | 0
        );

        return this._sprite.texture.source.hitMap[point.y * this._sprite.texture.source.width + point.x] > 0;
    }

    public checkHover(currentInputs: ICurrentInputs): boolean {
        if (!this.canBeHovered) return false;

        if (!this._sprite.visible) return false;

        return this.checkInput(currentInputs);
    }

    protected generateHitMap(): void {
        const baseTex: ImageSource = this._sprite.texture.source;

        if (baseTex.hitMap !== undefined) return;
        if (!baseTex.resource) return;

        let canvas, context;
        if (baseTex.resource instanceof ImageBitmap) {
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');

            canvas.width = baseTex.resource.width;
            canvas.height = baseTex.resource.height;
            context.drawImage(baseTex.resource, 0, 0);
        } else {
            // @ts-expect-error TODO fix that pls
            canvas = baseTex.resource.source;
            context = canvas.getContext('2d');
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const hitMap = new Uint32Array(canvas.width * canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            hitMap[i] = imageData.data[i * 4 + 3];
        }

        baseTex.hitMap = hitMap;
    }

    public get alpha() {
        return this._sprite.alpha;
    }

    public set alpha(alpha: number) {
        this._sprite.alpha = alpha;
    }

    public dispose(): void {
        this._sprite.destroy();
        this._disposed = true;
    }

    public get disposed() {
        return this._disposed;
    }

    public get canBeHovered() {
        return this._canBeHovered;
    }

    public get canBeClicked() {
        return this._canBeClicked;
    }

    public getDisplayableObject() {
        return this._sprite;
    }
}
