import React from "react";
import style from "./ForbiddenPage.module.css";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <>
      <div className={`${style["base"]}`}>
        <h1 className={`${style.io}`}>403</h1>
        <h2>Access forbidden</h2>
        <h5>(I'm sorry buddy...)</h5>
        <Link className="d-block text-center btn btn-primary mt-4" to={"/"}>Return To Home Page</Link>
      </div>
    </>
  );
}
