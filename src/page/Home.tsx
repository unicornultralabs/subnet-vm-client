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
  const [explorerData, setExplorerData] = useState<any[]>([]);
  const [lastClickGame, setLastClickGame] = useState<number>(0);
  const [winned, setWinned] = useState<string | undefined>('');
  const [isInGame, setIsInGame] = useState(false);
  const [tps, setTps] = useState(0)
  const [spamCount, setSpamCount] = useState(0);
  const [socket, setSocket] = useState<any>(null);
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number; }[]>([
    // { label: "0xsaf10", y: 71 },
  ]);

  const [lastWonTx, setLastWonTx] = useState<string | undefined>('');

  const handleJoinGame = () => {
    setIsInGame(true);
  };
  
  useEffect(() => {
    const socket = io('wss://b10g0wn1-8888.asse.devtunnels.ms/');

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    console.log('alo')
    socket.on('message', (newData: {
      code_hash: string, 
      from_address?: string, 
      from_value?: string, 
      to_address?: string, 
      to_value?: string, 
      tps?: number, 
      win?: string,
      data?: any 
      txHash?: string,
    }) => {
      console.log("new Data: ", newData);
      
      switch (newData.code_hash) {
        case '0xtransfer':
          setTps(newData.tps!)
          // console.log("newData ", newData);
          const updatedDataPoints = [
            {
              x: Number(newData.from_address!.replace('0x', '')),
              y: Number(newData.from_value)
            },
            {
              x: Number(newData.to_address!.replace('0x', '')),
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
          break;
        case 'explorer': 
          addItem(newData.data);
          break;  

        case '0xduangua': 
          setWinned(newData.win)
          setLastWonTx(newData.txHash)
          break; 

        default:
          break;
      }
    });
    
    setSocket(socket);

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleRacer1Click = () => {
    if (socket) {
      const message = {
        topic: 'race',
        userAddress: '0x1000001'
      };
      socket.send(JSON.stringify(message));
      setLastClickGame(0)
      setSpamCount(spamCount + 1);
    }
  };

  const handleRacer2Click = () => {
    if (socket) {
      const message = {
        topic: 'race',
        userAddress: '0x1000002'
      };
      socket.send(JSON.stringify(message));
      setLastClickGame(1)
      setSpamCount(spamCount + 1);
    }
  };

  const restartGame = () => {
    setWinned(undefined)
    setIsInGame(false)
  }

  const addItem = (newItem: any) => {
    setExplorerData((prevData) => {
      const updatedData = [...prevData, newItem];
      if (updatedData.length > 10) {
        updatedData.shift(); // Remove the first item if length exceeds 10
      }
      return updatedData;
    });
  };

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
        <div className="bg-gray-100 p-4">TPS: <span className="font-bold text-xl pl-1">{tps * 2}</span> transactions/second</div>
      </div> <br />
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
        <div className="flex justify-center">
          <button 
            className={`px-4 py-2 font-semibold text-white rounded-lg ${
              isInGame ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!isInGame}
            onClick={() => handleRacer1Click()}
          >
            Racer 1
          </button> 
          <button 
            className={`px-4 py-2 font-semibold text-white rounded-lg ml-2 ${
              isInGame ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!isInGame}
            onClick={() => handleRacer2Click()}
          >
            Racer 2
          </button>
        </div>
        {winned ? 
            <div className="pt-5 text-2xl text-blueSecondary font-bold mb-2">
              Winner is: {lastClickGame === 0 ? "Racer 1" : "Racer 2"}
            </div>
          : 
          <div className="pt-5 text-2xl text-blueSecondary font-bold mb-2">
            Winner is: ..... <br></br>
            Proof winner: {`https://pudge.explorer.nervos.org/transaction/${lastWonTx}`}
          </div>
        }
        {(isInGame && winned) && <button 
            className={`px-4 py-2 font-semibold text-white rounded-lg ml-2 ${
              isInGame ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!isInGame}
            onClick={() => restartGame()}
          >
            Restart Game
        </button>}

        {/* explorer start */}
        <div className="bg-gray-200 p-4 rounded-lg mt-4 max-h-[50vh] overflow-y-scroll">
          <h2 className="text-xl font-bold mb-2">Explorer Data</h2>
          {explorerData.length > 0 ? (
            <ul>
              {explorerData.map((item, index) => (
                <li key={index} className="p-2 mb-2 bg-blue-100 rounded">
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* explorer end */}
        
      </div>
    </div>
  );
};

export default Home;
