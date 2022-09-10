
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LoadingScreen, NavBar } from './components';
import './App.css';
import { Products, ProductDetail} from './pages';
import { useSelector } from 'react-redux';


function App() {

  const isLoading = useSelector((state) => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen/>}
        <NavBar />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          {/* <Route path="/purchases" element={<Purchases/>}></Route> */}
        </Routes>
      </HashRouter>
      <footer>
          <h5>Copyright ©2022</h5>
          <p><b>❮'by Ariel Fuentes García & Carlos Eduardo Rodriguez 2022'❯</b></p>
          <p><b>Academlo</b></p>
      </footer>
    </div>
  );
}

export default App;
