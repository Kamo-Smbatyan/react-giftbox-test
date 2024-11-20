import { useState } from "react";
import { motion } from "framer-motion";
import BOX from '../assets/BOX.svg';
import TOP from '../assets/TOP.svg';
import BACKPACK from '../assets/Backpack.svg';

const RewardComponent = () => {
  // Total 9 boxes and select 3 randomly for backpack
  const [boxes, setBoxes] = useState(
    Array(9).fill({ isOpen: false, isGlowing: false, isClickable: true, hasBackpack: false })
      .map((box, index) => ({
        ...box,
        hasBackpack: index < 3 ? false : Math.random() < 0.33, // Randomly pick 3 boxes
      }))
  );

  // Counter for attempts
  const [attempts, setAttempts] = useState(0);

  const handleClick = (boxIndex) => {
    if (attempts >= 3 || !boxes[boxIndex].isClickable) return; // Stop after 3 tries or if box is not clickable

    setBoxes((prevBoxes) => {
      return prevBoxes.map((box, index) => {
        if (index === boxIndex) {
          // Handle the clicked box to toggle its state
          return toggleBoxState(box, index);
        } else {
          // Allow all boxes to remain clickable after clicking another box
          return { ...box, isClickable: true };
        }
      });
    });

    setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts
  };

  const toggleBoxState = (box, index) => {
    if (!box.isClickable) return box;

    const updatedBox = { ...box, isGlowing: true, isClickable: false };

    // Wait for the glowing effect before opening the box
    setTimeout(() => {
      updatedBox.isGlowing = false;
      updatedBox.isOpen = true;
      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes[index] = updatedBox;
        return newBoxes;
      });
    }, 2000);

    return updatedBox;
  };

  const getTextStyle = (index) => {
    // Apply B9AC90 border for active, grey text and border for inactive
    if (attempts > index) {
      return "text-[#B9AC90] border-[#B9AC90]";
    } else if (attempts === index) {
      return "text-[#B9AC90] border-[#B9AC90]"; // Active color
    } else {
      return "text-white border-grey-500"; // Inactive color
    }
  };

  return (
    <div className="flex mt-6 items-center h-screen px-8 flex-col">
      {/* Display attempt texts */}
      <div className="flex space-x-8 mb-8">
        {['1st try', '2nd try', '3rd try'].map((text, index) => (
          <div key={index} className={`border-2 p-2 ${getTextStyle(index)}`}>
            {text}
          </div>
        ))}
      </div>

      {/* Display boxes */}
      <div className="grid grid-cols-3 gap-12">
        {boxes.map((box, index) => (
          <motion.div key={index} className="relative w-20 h-20">
            <div className="absolute inset-0">
              <img src={BOX} alt={`Gift Box ${index + 1}`} className="w-full h-full" />
            </div>
            {box.isGlowing && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-golden-glow" />
              </motion.div>
            )}
            <motion.div
              className="absolute -top-3 left-0 w-full"
              animate={{
                x: box.isOpen ? -40 : 0,
                rotate: box.isOpen ? -45 : 0,
                y: box.isGlowing ? -5 : box.isOpen ? -5 : 0,
              }}
              transition={{
                duration: box.isOpen ? 8 : 2,
                type: "spring",
                stiffness: 50,
                damping: 15,
              }}
            >
              <img src={TOP} alt="Gift Lid" className={`w-full ${box.isGlowing ? 'drop-shadow-golden' : ''}`} />
            </motion.div>
            {box.isOpen && (
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ top: '-72px' }}
                className="absolute top-5 mx-auto transform -translate-x-1/2 -translate-y-1/2"
              >
                {box.hasBackpack && <img src={BACKPACK} alt="Backpack" className="h-40 w-full" />}
              </motion.div>
            )}
            {(box.isClickable || !box.isOpen) && (
              <div onClick={() => handleClick(index)} className="absolute inset-0 cursor-pointer" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RewardComponent;
