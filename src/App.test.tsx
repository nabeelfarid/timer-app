import React, { ReactElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';

describe('Timer App', () => {

  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers();

  })

  test('Should have a button to Start the timer', () => {
    //Act
    render(<App />)

    //Assert
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  test('SHOULD have a button to Stop the timer', () => {
    //Act
    render(<App />)

    //Assert
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument();
  });

  test('SHOULD have a button to Reset the timer', () => {
    //Act
    render(<App />)

    //Assert
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('SHOULD have a disabled Stop button on load', () => {
    //Act
    render(<App />)

    //Assert
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('WHEN Timer is started, SHOULD disable Start button AND enable Stop button  ', () => {
    //Act
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    //Assert
    expect(screen.getByRole('button', { name: /start/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeEnabled();

  });

  test('WHEN Timer is stopped, SHOULD enable Start button AND disable Stop button  ', () => {
    //Act
    render(<App />,)
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    userEvent.click(screen.getByRole('button', { name: /stop/i }))

    //Assert
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('WHEN Timer is reset after starting, SHOULD enable Start button AND disable Stop button  ', () => {
    //Act
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    userEvent.click(screen.getByRole('button', { name: /reset/i }))

    //Assert
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('WHEN Timer is loaded, it is set to 25 min and 00 sec  ', () => {
    //Act
    render(<App />)

    //Assert
    expect(screen.getByRole('timer')).toHaveTextContent(/25:00/i);
    // expect(screen.getByRole('heading', { name: `Welcome nabeel!` })).toBeInTheDocument();
  });

  test('WHEN Timer is started, AFTER 5 secs it should count down to 24:55  ', () => {
    //Act
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    //Assert
    expect(screen.getByRole('timer')).toHaveTextContent(/24:55/i);
  });

  test('WHEN Timer is started, AFTER 30 secs it should count down to 24:30  ', () => {
    //Act
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    //Assert
    expect(screen.getByRole('timer')).toHaveTextContent(/24:30/i);
  });

  test('AFTER 60 secs, timer should count down to 24:00  ', () => {
    //Act
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    //Assert
    expect(screen.getByRole('timer')).toHaveTextContent(/24:00/i);
  });

  test('AFTER 25 min timer should automatically stop at 00:00  ', () => {
    //ARRANGE
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))

    //ACT
    act(() => {
      //go a second beyond 25 min
      jest.advanceTimersByTime((60000 * 25) + 1000);
    });

    //Assert
    //timer should stay at 00:00
    expect(screen.getByRole('timer')).toHaveTextContent(/00:00/i);
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('AFTER 25 min timer, further RESUMING timer should stay at 00:00  ', () => {
    //ARRANGE
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))

    act(() => {
      jest.advanceTimersByTime((60000 * 25));
    });

    //timer should pause at 00 
    expect(screen.getByRole('timer')).toHaveTextContent(/00:00/i);
    
    //ACT
    //press start again
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    //advance timer
    act(() => {
      jest.advanceTimersByTime((60000));
    });

    //Assert
    //timer should stay at 00:00
    expect(screen.getByRole('timer')).toHaveTextContent(/00:00/i);
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });


  test('WHEN stopped, timer should pause', () => {
    //ARRANGE
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    //run timer for 5 min
    act(() => {
      jest.advanceTimersByTime(60000 * 5);
    });
    //make sure timer has been updated
    expect(screen.getByRole('timer')).toHaveTextContent(/20:00/i);

    //ACT 
    userEvent.click(screen.getByRole('button', { name: /stop/i }))
    //run timer a bit more
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    //Assert
    //timer should still display the same value where it was stopped
    expect(screen.getByRole('timer')).toHaveTextContent(/20:00/i);
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('WHEN reset, Should clear and reset timer back to 25:00  ', () => {
    //ARRANGE
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    //run timer for a min
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent(/24:00/i);

    //ACT
    userEvent.click(screen.getByRole('button', { name: /reset/i }))
    act(() => {
      //run a bit more timer, This should not do anything as Reset has already claer the timer
      jest.advanceTimersByTime(60000);
    });

    //Assert
    // timer has been cleared and reset back to 25
    expect(screen.getByRole('timer')).toHaveTextContent(/25:00/i);
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /stop/i })).toBeDisabled();
  });

  test('AFTER App component is unmounted, timer should be cleaned up  ', () => {
    //ARRANGE
    jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<App />)
    //start timer
    userEvent.click(screen.getByRole('button', { name: /start/i }))
    //for 5 secs
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    //make sure timer has not been cleared yet
    expect(clearInterval).not.toHaveBeenCalled();
    
    //ACT
    //unmount App component
    unmount();

    //ASSERT timer has been cleared on unmount
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

})