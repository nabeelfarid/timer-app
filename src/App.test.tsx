import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('true to be truthy', ()=> {
//   expect(true).toBeTruthy();
// });

// test('2 + 4 should be 6', ()=>{
//   expect(sum(2,4)).toBe(6);
// })

describe('App tests suite', () => {

  test('renders App component', async() => {

    render(<App />);

    // expect(screen.getByText('Search')).toBeInTheDocument();

    // expect(screen.getByText('Search:')).toBeInTheDocument();

    // expect(screen.getByText(/Search/)).toBeInTheDocument();

    // expect(screen.getByRole('textbox')).toBeInTheDocument();

    // expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();

    // expect(screen.queryByText('Search')).toBeNull();

    // expect(screen.queryByText(/Nabeel/)).not.toBeInTheDocument()

    // screen.debug();

    // expect(await screen.findByText(/Nabeel/)).toBeInTheDocument()

    // screen.debug();

    // For any element that isn't there yet but will be there eventually, use findBy over getBy or queryBy. 
    // If you assert for a missing element, use queryBy. Otherwise default to getBy.

    await screen.findByText(/Signed in as :/)

    screen.debug();
    expect(screen.queryByText(/Results for Javascript/)).toBeNull();


    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: {
    //     value: 'Javascript'
    //   }
    // })

    userEvent.type(screen.getByRole('textbox'), 'Javascript')


    screen.debug();
    expect(screen.getByText(/Results for Javascript/)).toBeInTheDocument();
  });



})
