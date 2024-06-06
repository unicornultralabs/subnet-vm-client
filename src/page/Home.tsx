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
  const [isInGame, setIsInGame] = useState(false);
  const [tps, setTps] = useState(0)
  const [spamCount, setSpamCount] = useState(0);
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number; }[]>([
    // { label: "0xsaf10", y: 71 },
    // { label: "0xsaf20", y: 55 },
    // { label: "0xsaf30", y: 50 },
    // { label: "0xsaf40", y: 65 },
    // { label: "0xsaf50", y: 71 },
    // { label: "0xsaf60", y: 68 },
    // { label: "0xsaf70", y: 38 },
    // { label: "0xsaf80", y: 92 },
    // { label: "0xsaf90", y: 54 },
    // { label: "0xsaf100", y: 60 },
    // { label: "0xsaf110", y: 21 },
    // { label: "0xsaf120", y: 49 },
    // { label: "0xsaf130", y: 36 }
  ]);

  const handleJoinGame = () => {
    setIsInGame(true);
  };
  
  useEffect(() => {
    const socket = io('wss://b10g0wn1-8888.asse.devtunnels.ms');

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    console.log('alo')
    socket.on('message', (newData: {from_address: string, from_value: string, to_address: string, to_value: string, tps: number}) => {
      setTps(newData.tps)
      // console.log("newData ", newData);
      const updatedDataPoints = [
        {
          x: Number(newData.from_address.replace('0x', '')),
          y: Number(newData.from_value)
        },
        {
          x: Number(newData.to_address.replace('0x', '')),
          y: Number(newData.to_value)
        }
      ]
      setDataPoints(prevDataPoints => {
        const newDataPoints = [...prevDataPoints];
        // console.log("count prevDataPoints ", prevDataPoints.length);
        
        updatedDataPoints.forEach(newPoint => {
          if (!(newPoint.y > 1000000)) {
            const existingIndex = newDataPoints.findIndex(point => point.x === newPoint.x);
            if (existingIndex >= 0) {
              newDataPoints[existingIndex].y = newPoint.y;
            } else {
              newDataPoints.push(newPoint);
            }
          }
        });

        return newDataPoints;
      });
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
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-4">TPS: <span className="font-bold text-xl pl-1">{tps}</span> transactions/second</div>
      </div> <br /><br />
      <div className="text-center">
      <button 
        onClick={handleJoinGame} 
        disabled={isInGame}
        className={`px-4 py-2 font-semibold text-white rounded-lg ${
          isInGame ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}
      >
        {isInGame ? 'In Game' : 'Join Game'}
      </button> <br /><br />
      <button 
        className={`px-4 py-2 font-semibold text-white rounded-lg ${
          isInGame ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
        }`}
        disabled={!isInGame}
        onClick={() => setSpamCount(spamCount + 1)}
      >
        Racing.....
      </button>
      <div 
        className="mt-4 text-lg font-medium text-gray-700"
      >
        Spam Count: {spamCount}
      </div>
      </div>
    </div>
  );
};

export default Home;
