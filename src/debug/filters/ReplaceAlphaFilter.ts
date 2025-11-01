import { Filter, GlProgram } from 'pixi.js';

const vertex = `
  in vec2 aPosition;
  out vec2 vTextureCoord;

  uniform vec4 uInputSize;
  uniform vec4 uOutputFrame;
  uniform vec4 uOutputTexture;

  vec4 filterVertexPosition( void )
  {
      vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

      position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
      position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

      return vec4(position, 0.0, 1.0);
  }

  vec2 filterTextureCoord( void )
  {
      return aPosition * (uOutputFrame.zw * uInputSize.zw);
  }

  void main(void)
  {
      gl_Position = filterVertexPosition();
      vTextureCoord = filterTextureCoord();
  }
`;

const fragment = `
  in vec2 vTextureCoord;

  out vec4 finalColor;

  uniform float uAlpha;
  uniform sampler2D uTexture;

  void main()
  { 
    vec4 computedColor = texture(uTexture, vTextureCoord);
    
    if(computedColor.a < 0.0001) {
      finalColor = vec4(0.0, 0.0, 0.3, 0.2);
    } else {
      finalColor = computedColor;
    }
  }
`;

export const ReplaceAlphaFilter = () => {
    return new Filter({
        glProgram: GlProgram.from({
            fragment,
            vertex
        }),
    });
};