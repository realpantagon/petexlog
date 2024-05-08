import React from 'react';
import DataTable from './DataTable';
import Forminput from './Input';

function App() {
  return (
    <div className="flex">
      {/* <div className="w-3/12 bg-white h-screen">
        <DataTable />
      </div> */}
      <div className="w-9/12 bg-stone-100 h-full">
          <Forminput/>
      </div>
    </div>
  );
}

export default App;
