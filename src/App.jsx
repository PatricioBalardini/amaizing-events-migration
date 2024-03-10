import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default function App() {
  return (
    <main className="body-font oswald h-auto max-w-full border-t-indigo-50">
      <Header />
      <Main />
      <Footer />
    </main>
  );
}
