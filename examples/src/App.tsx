import { useState, useRef, memo, useEffect } from 'react';
import JsonServiceEditorCore from 'json-service-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { getValue, setValue } = new JsonServiceEditorCore({
  baseUrl: 'http://localhost:5173',
  fileName: 'demo.json'
});

fetch('http://localhost:3110/login?name=班纳', {
  method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // mode: 'cors',
  // body: JSON.stringify({ message: 'hello world!' }),
})

import './App.css';

function App() {
  const input = useRef(null);
  const [json, setJson] = useState(() => {
    getValue().then((res) => {
      toast.success('获取 JSON 成功!');
      setJson(JSON.stringify(res));
    })
    return '{}';
  });

  const onChange = () => {
    const { value } = input.current;
    setValue(value).then((res) => {
      toast.success('修改 JSON 成功!');
      setJson(JSON.stringify(res));
    })
  };

  useEffect(() => {
    if (input.current) input.current.value = json;
  }, [json]);

  return (
    <>
      <div className='container'>
        <textarea ref={input} className='textarea' />
        <button onClick={onChange} className='button'>onChange</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default memo(App);
