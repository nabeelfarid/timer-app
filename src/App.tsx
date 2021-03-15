import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './App.css';

const getUser = () =>
{
  return Promise.resolve({id:1,name:'Nabeel'})
}

function App() {
  const title = 'Hello React :)'
  const [value, setValue] = useState('')
  const [user, setUser] = useState('');


  useEffect(()=>{
    const loadUser = async () => {
      const user = await getUser()
      setUser(user.name);
    }
    loadUser();
  },[])


  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {user? <p>Signed in as : {user}</p> : null}
      </div>

      <Search value={value} onChange={onChangeHandler} >
        Search:
      </Search>

      <div>Results for {value? value : '...'}</div>

    </div>
  );
}

type SearchProps = {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Search: React.FC<SearchProps> = ({ value, onChange, children }) => {
  return (
    <div>
      <label htmlFor='search'>{children}</label>
      <input id='search' type='text' placeholder='Search' value={value} onChange={onChange} />
    </div>
  );
}

export default App;
