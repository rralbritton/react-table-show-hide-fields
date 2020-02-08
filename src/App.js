import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from "./mockData/mockData";
import ExpandedReactTable from './ExpandedReactTable';

function App() {
  return (
    <div className="App Container">
      <ExpandedReactTable data={data} />
    </div>
  );
}

export default App;
