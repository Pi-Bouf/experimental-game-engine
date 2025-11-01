import { Graphics, ImageSource, Point, Sprite, Texture } from 'pixi.js';

import { AssetTexture } from '../assets';
import { IAssetsManager } from '../assets/interfaces/IAssetsManager';
import { ReplaceAlphaFilter } from "../debug/filters/ReplaceAlphaFilter";
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { PRectangle } from '../geometry';
import { IPosition3D } from '../geometry/interfaces/IPosition3D';
import { Position3D } from '../geometry/Position3D';
import { EventCategory } from './enum/EventCategory';
import { IGraphic } from './interface/IGraphic';
import { ITween } from './tween/interface/ITween';
import { Tween } from './tween/Tween';

export abstract class Graphic extends Sprite implements IGraphic {
    protected id: string;
    private position3D: IPosition3D;
    private graphicBounds: PRectangle;
    private initialized: boolean;
    private positionUpdated: boolean;
    private frameUpdated: boolean;
    private tween: ITween;

    private followedGraphic: Graphic;

    private canBeHovered: boolean;
    private clickable: boolean;

    constructor(id: string, texture: Texture = Texture.EMPTY) {
        // (PIXI) By default, set an empty texture
        super(texture ?? Texture.EMPTY);
        // (PIXI) By default, the renderer don't need to display this shit !
        this.visible = false;

        this.id = id;
        this.position3D = new Position3D();
        this.graphicBounds = new PRectangle();
        this.initialized = texture !== Texture.EMPTY;
        this.positionUpdated = true;
        this.frameUpdated = true;

        this.canBeHovered = true;
        this.clickable = false;

        this.addChild(new Sprite(Texture.WHITE));
    }

    public needInitialization() {
        return !this.initialized;
    }

    public setInitialized(): void {
        this.initialized = true;
    }

    protected setAnchorPoint(xOffset: 'left' | 'right' | 'middle', yPxOffset: number) {
        switch (xOffset) {
            case 'left':
                this.anchor.set(0, (this.height - yPxOffset) / this.height);
                break;
            case 'right':
                this.anchor.set(1, (this.height - yPxOffset) / this.height);
                break;
            case 'middle':
                this.anchor.set(0.5, (this.height - yPxOffset) / this.height);
        }
    }

    public resetFilters() {
        this.filters = [];
    }

    protected addDebugFilter() {
        this.filters = [ReplaceAlphaFilter()];
    }

    protected drawAnchorPoint() {
        const border = new Graphics()
            .rect(-2, 0, 4, 4)
            .fill({ color: 0x00ff00 });

        this.addChild(border);
    }

    protected drawInnerBorder() {
        const width = this.texture.width;
        const height = this.texture.height;

        const border = new Graphics()
            .moveTo(1, 1)
            .lineTo(width, 1)
            .lineTo(width, height)
            .lineTo(1, height)
            .lineTo(1, 1)
            .stroke({ color: 0x00ff00, pixelLine: true });

        this.addChild(border);
    }

    public requestInitialization(): void {
        this.initialized = false;
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            this.texture = resourceManager.get<AssetTexture>(this.id);
            this.updateGraphicBounds();
            // this.generateHitMap();

            this.setInitialized();
        }
    }

    public needFrameUpdate(): boolean {
        return !this.frameUpdated;
    }

    public setFrameUpdated(): void {
        this.frameUpdated = true;
    }

    public requestFrameUpdate(): void {
        this.frameUpdated = false;
    }

    public updateFrame(): void {
        // Do nothing here, no need to update frame
        // To do something you have to extend it :)
        this.setFrameUpdated();
    }

    public needTweenUpdate(): boolean {
        return this.tween !== undefined && !this.tween.complete;
    }

    public updateTween(now: number): void {
        this.tween.update(now);
    }

    public addTween(tween: Tween) {
        this.tween = tween;
    }

    public setPositionUpdated(): void {
        this.positionUpdated = true;
    }

    public requestPositionUpdate(): void {
        this.positionUpdated = false;
    }

    public needPositionUpdate(): boolean {
        return !this.positionUpdated || this.followedGraphic !== undefined;
    }

    public setPosition3D(position3D: IPosition3D): void {
        this.position3D = position3D;
        this.requestPositionUpdate();
    }

    public updatePosition(stageOffset: Point): void {
        if(this.followedGraphic !== undefined) {
            this.position.set(this.followedGraphic.position.x + this.position3D.x, this.followedGraphic.position.y + this.position3D.y);
            this.zIndex = this.followedGraphic.position3D.z + this.position3D.z;
        } else {
            this.position.set(stageOffset.x + this.position3D.x, stageOffset.y + this.position3D.y);
            this.zIndex = this.position3D.z;
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

    public updateGraphicBounds(): void {
        this.graphicBounds = new PRectangle(this.position.x, this.position.y, this.texture.width, this.texture.height);
    }

    public checkGraphicBounds(graphicBounds: PRectangle): void {
        this.visible = graphicBounds.intersects(this.graphicBounds);
    }

    public follow(graphic: Graphic) {
        this.followedGraphic = graphic;
    }

    public unfollow() {
        this.followedGraphic = undefined;
    }

    public checkInput(currentInputs: ICurrentInputs): boolean {
        if (!this.graphicBounds) return false;

        if (!this.graphicBounds.contains(currentInputs.currentCursor.x, currentInputs.currentCursor.y)) return false;

        if (this.graphicBounds.width < 2 || this.graphicBounds.height < 2) return false;

        // @ts-expect-error TODO fix that pls
        if (!this.texture.source.hitMap) this.generateHitMap();

        const point = new Point((this.texture.frame.x + currentInputs.currentCursor.x - this.graphicBounds.x) | 0, (this.texture.frame.y + currentInputs.currentCursor.y - this.graphicBounds.y) | 0);
        // @ts-expect-error TODO fix that pls
        return this.texture.source.hitMap[point.y * this.texture.source.width + point.x] > 0;
    }

    public checkHover(currentInputs: ICurrentInputs): boolean {
        if (!this.canBeHovered) return false;

        if (!this.visible) return false;

        return this.checkInput(currentInputs);
    }

    protected generateHitMap(): void {
        const baseTex: ImageSource = this.texture.source;

        // @ts-expect-error TODO fix that pls
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

        // @ts-expect-error TODO fix that pls
        baseTex.hitMap = hitMap;
    }

    public getEventCategory(): EventCategory {
        return EventCategory.NONE;
    }

    public dispose(): void {
    }
}
