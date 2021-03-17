import { useEffect, useRef, useState } from 'react';
import './App.css';


const App = () => {
  const [startDisabled, setStartDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [, setForceRender] = useState(true)
  const mins = useRef<number>(25);
  const secs = useRef<number>(0);
  const timerInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    //clear timer when component is unmounted
    return () => {
      clearTimer();
    }
  }, [])

  const clearTimer = () => {
    if (timerInterval.current) {
      // console.log('clearing timer', timerInterval.current);
      clearInterval(timerInterval.current);
    }
  }

  const startTimer = () => {

    setStartDisabled(true);
    setStopDisabled(false);
    //clear any existing timer
    clearTimer();
    //set interval
    timerInterval.current = setInterval(() => {
      //Due to closures, SetInterval keeps referencing to te initial values of min and sec
      //Therefore making use of useRefs
      if (secs.current === 0) {
        //decrement minute value
        if (mins.current === 0) {
          stopTimer();
        } else {
          mins.current = mins.current - 1
          secs.current = 59
        }
      } else {
        //othereise keep decrementing secs until 0
        secs.current = secs.current - 1
      }
      // Since updating useref doesn't notify render, using a useState to update render 
      setForceRender(prev => !prev);

    }, 1000);

    // console.log('timer created', timerInterval.current)
  }

  const stopTimer = () => {
    clearTimer();
    setStartDisabled(false);
    setStopDisabled(true);
  }

  const resetTimer = () => {
    clearTimer();
    mins.current = 25;
    secs.current = 0;
    setStartDisabled(false);
    setStopDisabled(true);
    setForceRender(prev => !prev);
  }

  const onStartHandler = (e: React.MouseEvent<HTMLElement>) => {
    startTimer();
  }

  const onStopHandler = (e: React.MouseEvent<HTMLElement>) => {
    stopTimer();
  }

  const onResetHandler = (e: React.MouseEvent<HTMLElement>) => {
    resetTimer();
  }

  return (
    <div className='d-flex justify-content-center' style={{ minWidth: '320px' }}>
      <div className='text-center shadow my-4 p-4'>
        <h1 style={{ fontSize: '6em' }} role='timer'>{String(mins.current).padStart(2, '0')}:{String(secs.current).padStart(2, '0')}</h1>
        <button className='btn-lg w-100 rounded-pill my-2 btn-success' aria-label='Start' onClick={onStartHandler} disabled={startDisabled}>Start</button>
        <button className='btn-lg w-100 rounded-pill my-2 btn-danger ' aria-label='Stop' onClick={onStopHandler} disabled={stopDisabled} >Stop</button>
        <button className='btn-lg w-100 rounded-pill my-2 btn-warning' aria-label='Reset' onClick={onResetHandler} >Reset</button>
      </div>
    </div>
  );
}


export default App;
