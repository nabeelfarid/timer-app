import { useEffect, useRef, useState } from 'react';
import './App.css';


const App = () => {
  const [startDisabled, setStartDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [forceRender, setForceRender] = useState(true)
  const mins = useRef<number>(25);
  const secs= useRef<number>(0);
  const timerInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimer();
    }
  }, [])

  useEffect(()=>{

  }, [forceRender])

  const clearTimer = () => {
    if (timerInterval.current) {
      // console.log('clearing timer', timerInterval.current);
      clearInterval(timerInterval.current);
    }
  }

  const stopTimer = () => {
    clearTimer();
    setStartDisabled(false);
    setStopDisabled(true);
  }

  const startTimer = () => {
    
    setStartDisabled(true);
    setStopDisabled(false);
    //clear any existing timer
    clearTimer();
    //set interval
    timerInterval.current = setInterval(() => {
      //Due to closures SetInterval keeps referencing to old values
        if (secs.current === 0) {
          //decrement minute value
            if(mins.current === 0) {
              stopTimer();
            } else {
              mins.current = mins.current - 1
              //set secs back to 59
              secs.current = 59
            } 
        } else {
          //othereise keep decrementing secs until 0
          secs.current = secs.current - 1
        }
        setForceRender(prev => !prev);
      
    }, 1000);

    // console.log('timer created', timerInterval.current)
  }

  const onStartHandler = (e: React.MouseEvent<HTMLElement>) => {
    startTimer();
  }

  const onStopHandler = (e: React.MouseEvent<HTMLElement>) => {
    stopTimer();
  }

  const onResetHandler = (e: React.MouseEvent<HTMLElement>) => {
    clearTimer();
    mins.current = 25;
    secs.current = 0;
    setStartDisabled(false);
    setStopDisabled(true);
    setForceRender(prev => !prev);
  }

  return (
    <div>
      <h1>Welcome nabeel!</h1>
      <div role='timer'>{String(mins.current).padStart(2, '0')}:{String(secs.current).padStart(2, '0')}</div>
      <button aria-label='Start' onClick={onStartHandler} disabled={startDisabled}>Start</button>
      <button aria-label='Stop' onClick={onStopHandler} disabled={stopDisabled} >Stop</button>
      <button aria-label='Reset' onClick={onResetHandler} >Reset</button>

    </div>
  );
}


export default App;
