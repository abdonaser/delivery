import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Log from "./Pages/Log";
import SignUp from "./Pages/SignUp";
import OwnerProfile from "./Profiles/OwnerProfile";
import CustomerProfile from "./Profiles/CustomerProfile";
import AdminProfile from "./Profiles/AdminProfile";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import About from "./Pages/About";
import HomeModule from "./Pages/HomeModule";
import ErrorPage from "./Pages/ErrorPage";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import MenuPage from "./Pages/MenuPage";
import ProtectedRoute from "./ProtectedRoute";
import JoinUsForm from "./Pages/JoinUs";
import WaitingForApproval from "./Pages/WaitingForApproval";
import Checkout from "./Pages/CheckOut";
import Login from "./Pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeModule />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "restaurant/:id", element: <MenuPage /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
    // { path: "login", element: <Log />, errorElement: <ErrorPage /> },
    { path: "signup", element: <Login />, errorElement: <ErrorPage /> },
    // { path: "signup", element: <SignUp />, errorElement: <ErrorPage /> },
    { path: "join-us", element: <JoinUsForm />, errorElement: <ErrorPage /> },
    {
      path: "waiting-for-approval",
      element: <WaitingForApproval />,
      errorElement: <ErrorPage />,
    },
    {
      path: "owner-profile",
      element: (
        <ProtectedRoute allowedRoles={["owner"]}>
          <OwnerProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "customer-profile",
      element: (
        <ProtectedRoute allowedRoles={["customer"]}>
          <CustomerProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin-profile",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminProfile />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </>
  );
}

export default App;
