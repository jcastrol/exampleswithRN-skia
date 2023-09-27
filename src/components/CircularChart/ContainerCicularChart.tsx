import {
  Easing,
  runTiming,
  useFont,
  useValue,
} from "@shopify/react-native-skia";
import { PixelRatio, StyleSheet, View } from "react-native";
import { CircularChart } from "./CircularChart";
import { forwardRef, useImperativeHandle } from "react";



type Props = {
  percentage: number;
  label: string;
  radius?: number;
  color?: string;
  backgroundColor?: string
  strokeWidth?: number
  fontSize?: number
}
export type ContainerCicularChartRef = {
  onAnimateChart: () => void;
};
const ContainerCicularChart = forwardRef<ContainerCicularChartRef, Props>((props, ref) => {
  const {
    percentage,
    label,
    radius = 130,
    backgroundColor = "#d7d7d7",
    color = "#12a",
    strokeWidth = 12,
    fontSize = 60 } = props;
  const targetPercentage = (percentage / 100);

  const Pixelradius = PixelRatio.roundToNearestPixel(radius);

  const animationState = useValue(0);
  const opacityState = useValue(0);

  const onAnimateChart = () => {
    animationState.current = 0;
    opacityState.current = 0;
    runTiming(animationState, targetPercentage, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
    runTiming(opacityState, 1, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  useImperativeHandle(ref, () => ({
    onAnimateChart,
  }),[]);

  const font = useFont(require("../../assets/fonts/Satoshi-Bold.otf"), fontSize);
  const smallerFont = useFont(require("../../assets/fonts/Satoshi-Light.otf"), fontSize / (2.4));

  if (!font || !smallerFont) {
    return <View />;
  }

  const styles = StyleSheet.create({
    ringChartContainer: {
      width: (Pixelradius * 2),
      height: (Pixelradius * 2),
      borderRadius: Pixelradius,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <View style={styles.ringChartContainer}>
      <CircularChart
        backgroundColor="white"
        radius={Pixelradius}
        strokeWidth={strokeWidth}
        percentageComplete={animationState}
        percentage={percentage}
        font={font}
        smallerFont={smallerFont}
        label={label}
        color={color}
        fontColor={'black'}
        opacity={opacityState}
      />
    </View>
  );
});


export default ContainerCicularChart;