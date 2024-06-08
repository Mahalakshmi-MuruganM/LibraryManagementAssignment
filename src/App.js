import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BooksList from "./components/pages/BooksList";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/users" element={<BooksList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
