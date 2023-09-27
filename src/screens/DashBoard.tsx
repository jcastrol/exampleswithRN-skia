import React from 'react'
import ContainerCicularChart, { ContainerCicularChartRef } from '../components/CircularChart/ContainerCicularChart';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {}

const DashBoard = (props: Props) => {
  const containerChartRef = React.useRef<ContainerCicularChartRef | null>(null);
  
  const onAnimateChart = () => {
    if (containerChartRef.current) {
      containerChartRef.current.onAnimateChart();
    }
  };
  return (
    <View style={styles.constainer}>
      <ContainerCicularChart ref={containerChartRef} percentage={30} label='test' />
      <TouchableOpacity onPress={onAnimateChart} style={styles.button}>
        <Text style={styles.buttonText}>Animate !</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  constainer: {
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },

  button: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#12a",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
export default DashBoard