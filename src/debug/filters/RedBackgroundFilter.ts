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

  uniform sampler2D uTexture;

  void main()
  { 
    vec4 computedColor = texture(uTexture, vTextureCoord);
    
    // Red background with alpha (0.4 = 40% opacity)
    vec4 redBackground = vec4(1.0, 0.0, 0.0, 0.4);
    
    // If there's content, blend it with red background
    // If transparent, show red background
    if (computedColor.a < 0.01) {
      finalColor = redBackground;
    } else {
      // Blend red background behind the content
      finalColor = mix(redBackground, computedColor, computedColor.a);
      finalColor.a = max(computedColor.a, redBackground.a * 0.5);
    }
  }
`;

export const RedBackgroundFilter = () => {
    return new Filter({
        glProgram: GlProgram.from({
            fragment,
            vertex
        }),
    });
};

