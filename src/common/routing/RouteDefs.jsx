import App from "App";
import { Footer, Header, Home, PageNotFound, PlayNotFound} from "common";
import PlayList from 'common/playlists/PlayList';
import { getAllPlays } from 'meta/play-meta-util';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RouteDefs = () => {
  const plays = getAllPlays();
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plays" element={<App />}>
          <Route index element={<PlayList />} />
          {plays.map((play, index) => (
            <Route key={index} path={play.path} element={play.component()} />
          ))}
        </Route>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/play-not-found" element={<PlayNotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default RouteDefs;
