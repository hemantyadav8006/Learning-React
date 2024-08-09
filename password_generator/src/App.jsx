import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charaterAllowed, setcharaterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);


  const passwordGenertor = useCallback(() => {
    let pass= "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charaterAllowed) str += "~!@#$%^&*()_+-{}[]|:',.<>/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
 
    }

    setPassword(pass)

  }, [length, numberAllowed, charaterAllowed, setPassword]) // these dependancies are for optimization

  useEffect(() => {
    passwordGenertor()
  }, [length, numberAllowed, charaterAllowed, passwordGenertor]) // if any dependance change than it will run the defination function

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 4)
    window.navigator.clipboard.writeText(password);
    alert("Password Copied");
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-center text-4xl my-3'>Password Genertor</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          placeholder='Password'
          className='outline-none w-full py-1 px-3'
          readOnly
          ref={passwordRef}
          />
          <button 
          className='outline-none bg-orange-400 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() => {setnumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {charaterAllowed}
            id='charaterInput'
            onChange={() => {setcharaterAllowed((prev) => !prev)}}
            />
            <label htmlFor="charaterInput">Charaters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
