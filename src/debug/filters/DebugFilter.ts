import { Filter } from 'pixi.js';
// import { hex2rgb } from '@pixi/utils';

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 color;

void main(void)
{
   vec4 c = texture2D(uSampler, vTextureCoord);
   gl_FragColor = c;
   
   if(c == vec4(0.0, 0.0, 0.0, 1.0)) {
     gl_FragColor = vec4(1.0, 0.8, 0.8, 1);
   }
}
`;
// TODO fix the utils call, replace with @pixi/Colors
export class DebugFilter extends Filter {

    constructor(/* color: number */) {
        super(undefined, fragment);

        // const arrayColor = new Float32Array(3);

        // this.uniforms.color = hex2rgb(color, arrayColor);
    }
}