import { Chessboard } from "react-chessboard";

function App() {
  return (
    <div className="App w-screen h-screen bg-slate-400 flex items-center justify-center">
      <div className="w-[40%]">
        <Chessboard id="Main" />
      </div>
    </div>
  );
}

export default App;
