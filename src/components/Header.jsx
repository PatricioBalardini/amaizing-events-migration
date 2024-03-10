import LogoPNG from "../assets/img/logo.png";

const links = [
  { id: "home", href: "#home", label: "Home" },
  { id: "past-events", href: "past-events", label: "Past Events" },
  { id: "upcoming-events", href: "upcoming-events", label: "Upcoming Events" },
  { id: "details", href: "details", label: "Details" },
  { id: "Status", href: "status", label: "Status" },
  { id: "Contact", href: "contact", label: "Contact" },
];

const Link = (link) => {
  return (
    <a
      href={link.href}
      className="title-font mb-4 ml-3 text-xl font-medium text-black md:flex-row"
    >
      {link.label}
    </a>
  );
};

export default function Header() {
  return (
    <header className="back flex flex-col border-b border-gray-300 bg-transparent md:sticky">
      <div className="container flex items-center justify-between p-5">
        {/* <div className="bg-logo z-50 h-auto max-w-full bg-cover"></div> */}
        <img src={LogoPNG} alt="Logo PNG" className="h-[32px] w-auto" />
        <nav className="items-center justify-center md:ml-4 ">
          {links.map((link) => (
            <Link key={link.id} {...link} />
          ))}
        </nav>
      </div>
    </header>
  );
}
