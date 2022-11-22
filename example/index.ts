import { Action } from './enum/Action';
import { Avatar } from './Avatar';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Direction } from './enum/Direction';
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
    maxDisplayRate: 60,
    images: {
        imageDomain: 'http://127.0.0.1:8081/images/',
    },
});

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

const avatar = ['avatar/archer_001.png', 'avatar/wizard_001.png', 'avatar/soldier_001.png'];

for (let i = 0; i < 100; i++) {
    const randomDirection = direction[Math.random() * 4 | 0];
    const randomAction = action[Math.random() * 8 | 0];
    const randomAvatar = avatar[Math.random() * 3 | 0];

    const player = new Avatar(randomAvatar, randomAction, randomDirection);
    player.setPosition(new Position3D(Math.random() * 1700 | 0, Math.random() * 700 | 0));
    sandbox.stage.addChild(player);
}