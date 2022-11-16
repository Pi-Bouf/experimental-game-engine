
// const sandbox = new Engine({
//     width: 1000,
//     height: 1000,
//     canvasContainer: document.body,
//     backgroundAlpha: 0,
//     mouseEventFrequency: 50,
//     autoResize: true,
//     maxAnimationRate: 8,
//     maxDisplayRate: 140,
//     images: {
//         imageDomain: 'http://127.0.0.1:8082/',
//     },
// });

import { Application, Sprite } from 'pixi.js';
import { AssetsManager } from '../src/assets/AssetsManager';

const assetsManager = new AssetsManager('http://127.0.0.1:8081/images/splash-screen/');

const url = 'bg_hotel.out.png';
const urls: string[] = [];

const count = 500;

console.time('one');

for (let i = 0; i < count; i++) {
    urls[i] = url + '?v=' + (Math.random() * 10000 | 0) + (+ Math.random() * 10000 | 0) + (+ Math.random() * 10000 | 0);
}

let loaded = 0;

const app = new Application();
document.body.append(app.view as HTMLCanvasElement);

const interval = setInterval(() => {
    for (let i = 0; i < count; i++) {
        if (assetsManager.has(urls[i])) {
            const sprite = new Sprite(assetsManager.get(urls[i]));
            sprite.position.set(Math.random() * 500 - 200, Math.random() * 500 - 300);
            app.stage.addChild(sprite);
            loaded++;

            if (loaded === count) {
                clearInterval(interval);
            }
        }
    }
}, 100);