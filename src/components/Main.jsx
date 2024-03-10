import Home from "../pages/Home";
import Details from "../pages/Details";
import Upcoming from "../pages/Upcoming";
import Past from "../pages/Past";
import Stast from "../pages/Stast";
import Contact from "../pages/Contact";

export default function Main() {
  return (
    <div className="flex">
      <div className="">
        {" "}
        <Home />
        <Details />
        <Upcoming />
        <Past />
        <Stast />
        <Contact />
      </div>
    </div>
  );
}
