import Header from "./components/Header";
import "./App.css";
import Body from "./components/Body";
import store from "./components/utills/store"
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer"
import WatchPage from "./components/Watchpage"
const App = () => {
  return (
    <>
      <Provider store={store}>
        <div >
          <Header />
          <RouterProvider router={appRouter} />
        </div>
      </Provider>
    </>
  )
}

export default App

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body />,
  children:
    [
      {
        path: "/",
        element: <MainContainer />
      },
      {
        path: "/watch",
        element: <WatchPage />
      }
    ]

}])