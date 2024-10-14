import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv } from "./motionDiv";

const Motion = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </MotionDiv>
    </>
  );
};

export default Motion;
