import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import "./App.css";
import Dynamics365Entity from "./Dynamics365Entity";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
// import DeleteEmployee from "./DeleteEmployee";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />
        <Route path="/tab" element={<Tab />} />
        <Route path="/config" element={<TabConfig />} />
        <Route path="/dynamic365-entity" element={<Dynamics365Entity />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        {/* <Route path="/delete-employee/:id" element={<DeleteEmployee />} /> */}
      </Routes>
    </Router>
  );
}

