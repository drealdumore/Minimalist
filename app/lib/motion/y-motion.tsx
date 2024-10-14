import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Motion = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default Motion;
