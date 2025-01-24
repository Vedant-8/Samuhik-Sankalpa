import React from 'react'
import {PlinkoBoard} from "./plinkoBoard";
import './Game.css';
import Navbar from "../../../Components/User/Navbar";
import Footer from "../../../Components/Footer";

function Game() {
  return (
    <>
    <Navbar />
      <div>
        <PlinkoBoard></PlinkoBoard>
      </div>
      <Footer />
    </>
  )
}

export default Game