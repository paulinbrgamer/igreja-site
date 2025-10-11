import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Live from "../pages/Live";
import Events from "@/pages/Events";
import Account from "@/pages/Account";
import EventDetails from "@/pages/EventsDetails";
const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/live", element: <Live /> },
  { path: "/events", element: <Events /> },
  {path: "/events/:id",element: <EventDetails />},
  { path: "/account",element : <Account/>},
  { path: "*", element: <h1 className="text-center mt-10 text-2xl">Página não encontrada 😢</h1> },
];
export default routes;