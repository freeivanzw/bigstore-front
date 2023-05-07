import Header from './components/Header/Header';
import Routers from './components/Routers/Routers';

function App() {
  const siteName = 'BigStore';

  return (
    <div className="App">
      <Header siteName={siteName}/>
      <Routers />
    </div>
  );
}

export default App;
