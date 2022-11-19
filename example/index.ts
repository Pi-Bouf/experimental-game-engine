import { Archer } from './Archer';
import { Engine } from '../src/Engine';
import { Position3D } from '../src/geometry/Position3D';

const sandbox = new Engine({
    width: 1000,
    height: 1000,
    canvasContainer: document.body,
    backgroundAlpha: 0,
    mouseEventFrequency: 10000,
    autoResize: true,
    maxAnimationRate: 8,
    maxDisplayRate: 10,
    images: {
        imageDomain: 'http://127.0.0.1:8081/images/',
    },
});

for (let i = 0; i < 100; i++) {

    const archer = new Archer('avatar/archer_001.png');
    archer.setPosition(new Position3D(Math.random() * 1300 | 0, Math.random() * 800 | 0));
    sandbox.stage.addChild(archer);
}