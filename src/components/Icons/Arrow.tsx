import React, { FC } from 'react';
import { Svg, G, Path } from 'react-native-svg';
import { IconProps } from './props';
import { Colors } from '../../utils/Colors';

export const Arrow: FC<IconProps> = ({ width = 100, height = 100, color = Colors.white }) => (
  <Svg viewBox="0 0 129 129" width={width} height={height}>
    <G fill={color}>
      <G>
        <Path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
      </G>
    </G>
  </Svg>
);
