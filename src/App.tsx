import { useEffect, useState } from 'react';
import { idText } from 'typescript';
import './App.css';


const App = () => {
  const [startDisabled, setStartDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [mins, setMins] = useState<number>(25);
  const [secs, setSecs] = useState<number>(0);
  // const [startTimer, setStartTimer] = useState(false);

  // const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
  let timer: NodeJS.Timeout;
  const toggleButtons = () => {
    setStartDisabled(!startDisabled);
    setStopDisabled(!stopDisabled);
  }

  useEffect(() => {
    // console.log('start effect:');

    return () => {
      if (timer) {
        // console.log('clear timer', startTimer)
        clearTimer();
      }
    }

  }, [])

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  }

  const resetTimer = () => {
    clearTimer();
    setSecs(0);
    setMins(0);
    setStartDisabled(false);
    setStopDisabled(true);
  }

  const startTimer = () => {
    clearTimer();

    timer = setInterval(() => {
      //Due to closures SetInterval keeps referencing to old values
      setSecs(prevSecs => {
        if (prevSecs === 0) {
          //decrement minute value
          setMins(prevMins => {
            if(prevMins === 0) {
              resetTimer();
              return 0;
            }
            return prevMins - 1
          });             
          //set secs back to 59
          return 59;
        } else {
          //othereise keep decrementing secs until 0
          return prevSecs - 1
        }
      });
    }, 1000);
  }

  const onStartHandler = (e: React.MouseEvent<HTMLElement>) => {
    toggleButtons();
    startTimer();
  }

  const onStopHandler = (e: React.MouseEvent<HTMLElement>) => {
    toggleButtons();
  }

  const onResetHandler = (e: React.MouseEvent<HTMLElement>) => {
    setStartDisabled(false);
    setStopDisabled(true);

  }

  return (
    <div>
      <h1>Welcome nabeel!</h1>
      <div role='timer'>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</div>
      <button aria-label='Start' onClick={onStartHandler} disabled={startDisabled}>Start</button>
      <button aria-label='Stop' onClick={onStopHandler} disabled={stopDisabled} >Stop</button>
      <button aria-label='Reset' onClick={onResetHandler} >Reset</button>

    </div>
  );
}


export default App;
