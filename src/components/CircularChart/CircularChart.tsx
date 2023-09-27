import React, { FC } from 'react'
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  SkiaMutableValue,
  Text,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useDerivedValue } from 'react-native-reanimated';

type OptionalProps = {
  backgroundColor?: string;
  label?: string;
  percentageComplete?: SkiaMutableValue<number>;
  opacity?: SkiaMutableValue<number>;
  color?: string;
  fontColor?: string;
};

type RequiredProps = {
  strokeWidth: number;
  radius: number;
  font: SkFont;
  smallerFont: SkFont;
  percentage: number;
};

type Props = RequiredProps & OptionalProps;

export const CircularChart: FC<Props> = ({
  strokeWidth,
  radius,
  percentageComplete,
  opacity,
  font,
  label="",
  percentage,
  smallerFont,
  color = 'black',
  fontColor = 'black'
}: Props) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${percentage}`;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  const matrix = useDerivedValue(() => {
    const m = Skia.Matrix();
    m.translate(radius, radius);
    m.rotate((0.75 % 1) * 2 * Math.PI)
    m.translate(-radius, -radius);
    return m;
  });
 

  const width = font.getTextWidth(targetText);
  const titleWidth = smallerFont.getTextWidth(label);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container} >
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
          matrix={matrix}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          opacity={opacity}
          color={fontColor}
        />
        <Text
          x={innerRadius - titleWidth / 2}
          y={radius + 45}
          text={label}
          font={smallerFont}
          opacity={opacity}
          color={fontColor}
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});