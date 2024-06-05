import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Home: React.FC = () => {
  // const options = {
  //   animationEnabled: true,
  //   exportEnabled: true,
  //   theme: "light2", //"light1", "dark1", "dark2"
  //   title:{
  //     text: "Simple Column Chart with Index Labels"
  //   },
  //   axisY: {
  //     includeZero: true
  //   },
  //   data: [{
  //     type: "column", //change type to bar, line, area, pie, etc
  //     //indexLabel: "{y}", //Shows y value on all Data Points
  //     indexLabelFontColor: "#5A5757",
  //     indexLabelPlacement: "outside",
  //     dataPoints: [
  //       { x: 10, y: 71 },
  //       { x: 20, y: 55 },
  //       { x: 30, y: 50 },
  //       { x: 40, y: 65 },
  //       { x: 50, y: 71 },
  //       { x: 60, y: 68 },
  //       { x: 70, y: 38 },
  //       { x: 80, y: 92, indexLabel: "Highest" },
  //       { x: 90, y: 54 },
  //       { x: 100, y: 60 },
  //       { x: 110, y: 21 },
  //       { x: 120, y: 49 },
  //       { x: 130, y: 36 }
  //     ]
  //   }]
  // }
  
  // return (
  // <div>
  //   <CanvasJSChart options = {options} 
  //     /* onRef={ref => this.chart = ref} */
  //     /* containerProps={{ width: '100%', height: '300px' }} */
  //   />
  //   {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

  // </div>
  // );
  const [dataPoints, setDataPoints] = useState([
    { x: 10, y: 71 },
    { x: 20, y: 55 },
    { x: 30, y: 50 },
    { x: 40, y: 65 },
    { x: 50, y: 71 },
    { x: 60, y: 68 },
    { x: 70, y: 38 },
    { x: 80, y: 92, label: "Highest" },
    { x: 90, y: 54 },
    { x: 100, y: 60 },
    { x: 110, y: 21 },
    { x: 120, y: 49 },
    { x: 130, y: 36 }
  ]);

  useEffect(() => {
    const socket = io('ws://localhost:8888/ping');

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    console.log('alo')
    socket.on('updateData', (newData: {address: string, balance: string}[]) => {
      const updatedDataPoints = newData.map(({ address, balance }) => ({
        x: parseInt(address, 10),
        y: parseInt(balance, 10)
      }));
      setDataPoints(updatedDataPoints);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.close();
    };
  }, []);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Dynamic Column Chart with WebSocket Data"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: dataPoints
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Home;
