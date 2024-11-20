import { useState } from "react";
import { motion } from "framer-motion";
import BOX from '../asstes/BOX.svg';  
import TOP from '../asstes/TOP.svg';  

const RewardComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = () => {
    if (isClickable) {
      setIsGlowing(true);
      setIsClickable(false);
      setTimeout(() => {
        setIsGlowing(false);
        setIsOpen(true);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-32 h-32">
        {/* Gift Box - Using BOX.svg */}
        <div className="absolute inset-0">
          <img src={BOX} alt="Gift Box" className="w-full h-full" />
        </div>

        {/* Glow Effect */}
        {isGlowing && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-1/2 " />
          </motion.div>
        )}

        {/* Gift Lid with Animation - Using TOP.svg */}
        <motion.div
          className="absolute -top-5 left-0 w-full"
          animate={{
            x: isOpen ? -80 : 0,  
            rotate: isOpen ? -95 : 0,  
            y: isGlowing ? -5 : (isOpen ? -40 : 0),
          }}
          transition={{
            duration: isOpen ? 8 : 2,  
            type: "spring",
            stiffness: 50, 
            damping: 15, 
          }}
        >
          <img
            src={TOP}
            alt="Gift Lid"
            className={`w-full ${isGlowing ? 'drop-shadow-golden' : ''}`}
          />
        </motion.div>

        {/* Clickable area to trigger animation */}
        {isClickable && (
          <div
            onClick={handleClick}
            className="absolute inset-0 cursor-pointer"
          ></div>
        )}
      </div>
    </div>
  );
};

export default RewardComponent;