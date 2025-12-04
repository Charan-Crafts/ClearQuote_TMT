import React from 'react';
import Layout from './Components/Layout';
import { Routes ,Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AddNew from './AddNew';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Dashboard/>} />
          <Route path="add-new" element={<AddNew/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
