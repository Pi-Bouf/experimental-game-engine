
import { Graphic, Position3D } from "../src";
import { Engine } from '../src';
import { Avatar } from './Avatar';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Effect } from "./Effect";
import { Action } from './enum/Action';
import { Direction } from './enum/Direction';

const sandbox = new Engine({
    width: 1200,
    height: 1000,
    canvasContainer: document.body,
    backgroundAlpha: 0,
    mouseEventFrequency: 10000,
    autoResize: true,
    maxAnimationRate: 16,
    maxDisplayRate: 140,
    images: {
        imageDomain: process.env.ASSETS_URL ?? 'http://127.0.0.1:8081/',
    },
});

const urlParams = new URLSearchParams(window.location.search);
const avatarCount = urlParams.get('avatarCount') ? parseInt(urlParams.get('avatarCount')) : 100;

sandbox.init().then(() => {

    AvatarPositionComputer.init();

    // for (let i = 0; i < 100; i++) {
    //
    //     const archer = new Avatar('avatar/archer_001.png');
    //     archer.setPosition(new Position3D(Math.random() * 1300 | 0, Math.random() * 800 | 0));
    //     sandbox.stage.addChild(archer);
    // }


    const direction = [Direction.N, Direction.E, Direction.S, Direction.W];
    const action = [
        Action.WAIT,
        Action.WALK,
        Action.RUN,
        Action.ATTACK,
        Action.DEFEND,
        Action.BEHIT,
        Action.USE,
        Action.DIE,
    ];

    const avatars = ['avatar/archer_001.png', 'avatar/archer_001.png', 'avatar/archer_001.png'];
    const effects = ['effect/effect_001.png', 'effect/effect_002.png'];

    console.log(`Creating ${avatarCount} avatars`);

    const players = [];

    for (let i = 0; i < avatarCount; i++) {
        const randomDirection = direction[Math.random() * 4 | 0];
        const randomAction = action[Math.random() * 8 | 0];
        const randomAvatar = avatars[Math.random() * 3 | 0];

        const player = new Avatar(randomAvatar, randomAction, randomDirection);
        player.setPosition(new Position3D(Math.random() * 1000 | 0, Math.random() * 1000, 0));

        players.push(player);

        sandbox.stage.addChild(player);
        //
        // setInterval(() => {
        //     player.setPosition(new Position3D(Math.random() * 500 | 0, Math.random() * 500 | 0));
        // }, 1000);

        // const graphic = new GraphicDebugWhite();

        // sandbox.stage.addChild(graphic);
        //
        //
        const randomEffect = effects[Math.random() * 2 | 0];

        const effect = new Effect(randomEffect);

        // effect.setPosition(new Position3D(200, 100, 0));
        sandbox.stage.addChild(effect);
        // //
        // player.drawAnchorPoint();
        // effect.drawAnchorPoint(0xFF0000);
        effect.follow(player);

        sandbox.stage.viewport.follow(player.getDisplayableObject());
    }

    const playerMoving = players[0];

    function moveInCircle(object: Graphic, centerX: number, centerY: number, radius: number, speed: number) {
        let angle = 0;

        const interval = setInterval(() => {

            object.setPosition(new Position3D(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 10000));


            // sandbox.stage.viewport.moveCenter(Math.random() * 1000 | 0, Math.random() * 1000 | 0);

            // Increment angle (speed controls how fast it moves)
            angle += speed;

            // Optional: reset angle to prevent it from growing infinitely
            if (angle > Math.PI * 2) {
                angle -= Math.PI * 2;
            }
        }, 10); // ~60 FPS

        // Return the interval ID so you can stop it later with clearInterval(interval)
        return interval;
    }


    sandbox.stage.viewport.follow(playerMoving.getDisplayableObject());


    let isFollowing = true;

    function toggleFollow() {
        if (isFollowing) {
            // Stop following
            sandbox.stage.viewport.plugins.remove('follow');
            sandbox.stage.viewport.drag(); // Re-enable drag if needed
            isFollowing = false;
        } else {
            // Start following
            sandbox.stage.viewport.plugins.remove('drag'); // Remove drag to avoid conflicts
            sandbox.stage.viewport.follow(playerMoving.getDisplayableObject());
            isFollowing = true;
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            toggleFollow();
        }
    });

    // Usage example:
    moveInCircle(playerMoving, 500, 500, 200, 0.05);

    // setInterval(() => {
    //     const randomEffect = effects[Math.random() * 2 | 0];
    //     const effect = new Effect(randomEffect);
    //
    //     effect.setPosition(new Position3D(Math.random() * 1300 | 0, Math.random() * 800 | 0));
    //
    //     sandbox.stage.addChild(effect.displayableObject);
    // }, 50);
});






//
//
//
// import { Container, Sprite, Texture, WebGLRenderer } from "pixi.js";
// import { Viewport } from "pixi-viewport";
//
// // or with require
// // const PIXI = require('pixi.js')
// // const Viewport = require('pixi-viewport').Viewport
//
// const run =  async ()=>  {
//     const renderer = new WebGLRenderer();
//     await renderer.init({});
//     document.body.appendChild(renderer.canvas);
//
//     // CREATE A STAGE (this is what Application does automatically)
//     const stage = new Container();
//
//     // create viewport as a child of stage
//     const viewport = new Viewport({
//         screenWidth: window.innerWidth,
//         screenHeight: window.innerHeight,
//         worldWidth: 1000,
//         worldHeight: 1000,
//         events: renderer.events,
//     });
//
//     stage.addChild(viewport);
//
//     // activate plugins
//     viewport.drag();
//
//     // add a red box
//     const sprite = viewport.addChild(new Sprite(Texture.WHITE));
//     sprite.tint = 0xff0000;
//     sprite.width = sprite.height = 100;
//     sprite.position.set(100, 100);
//
//     // Render loop
//     function animate() {
//         renderer.render(stage);
//         requestAnimationFrame(animate);
//     }
//
//     animate();
//
// };
//
// run();