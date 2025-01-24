import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Test = () => {

    return (
        <motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Your content here
</motion.div>
    );
    }

    export default Test;