import "./styles/App.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from "./components/Header";
import JobList from "./components/JobList";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <div className="app bg-dark d-flex flex-column min-vh-100">
        <Header></Header>
        <JobList></JobList>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
