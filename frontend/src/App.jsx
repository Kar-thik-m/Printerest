
import { Loaduser } from "./Action/Users.jsx";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import MainPage from "./Page/MainPage.jsx";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Loaduser);
  }, [dispatch])

  return (
    <div>
      <MainPage />
    </div>
  )
}

export default App
