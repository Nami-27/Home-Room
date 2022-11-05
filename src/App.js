import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { FanPage, LightPage, RoomPage, WelcomePage, Room } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              <li>
                <Link to="/fan">Fans</Link>
              </li>
              <li>
                <Link to="/bulb">Lights</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rooms/:roomId" element={<Room />}></Route>
            <Route path="/rooms" element={<RoomPage />}></Route>
            <Route path="/fan" element={<FanPage />}></Route>
            <Route path="/bulb" element={<LightPage />}></Route>
            <Route path="/" element={<WelcomePage />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
