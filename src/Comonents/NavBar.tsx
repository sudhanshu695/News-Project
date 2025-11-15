import { easeInOut, motion } from "framer-motion";
import type React from "react";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const Navvariant = {
  hidden: { height: "5.6rem" },
  visible: { height: "12rem", transition: { duration: 0.6, easeInOut } },
};

const itemsVariant = {
  noHover: { scale: 1 },
  onHover: { scale: 1.1, color: "#ed3419" },
};

const linkVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const topic = ["Trending", "Sports", "Technology", "Global"];

const newsCategories = [
  { title: "Entertainment" },
  { title: "Technology" },
  { title: "Sports" },
  { title: "Business"},
  { title: "General"},
  { title: "Health"},
  { title: "Science"},
];


export interface StateProp {
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}


const NavBar : React.FC<StateProp> = ({isOpen , setIsOpen}) => {

  return (
    <motion.nav
      variants={Navvariant}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className="fixed top-0 w-full bg-gray-900 z-10 text-white"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
    >
      <motion.div
        className="flex p-7 justify-between items-center"
        
      >
        <motion.div
          variants={itemsVariant}
          initial="noHover"
          whileHover="onHover"
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="text-white font-bold text-2xl cursor-pointer"
        >
            <MotionLink
            to={`/general`}
            >
               Newzx
            </MotionLink>
         
          
        </motion.div>

        <motion.div className="flex space-x-16">
          {topic.map((nav, index) => (
            <MotionLink
              key={index}
              to={`/${nav.toLowerCase()}`}
              variants={itemsVariant}
              initial="noHover"
              whileHover="onHover"
              className="cursor-pointer"
            >
              {nav}
            </MotionLink>
          ))}
        </motion.div>
        <motion.button
          className="bg-gray-700 text-white p-2 rounded-2xl hover:bg-gray-600"
          whileHover={{ scale: 1.1  }}
          whileTap={{ scale: 0.8  }}
        >
          Join Us
        </motion.button>
      </motion.div>

      <motion.div
        variants={linkVariant}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="flex justify-between"
      >
        {newsCategories.map((data, index) => (

          <div key={index} className="mt-3 m-auto p-4">
            <MotionLink
            variants={itemsVariant}
              initial="noHover"
              whileHover="onHover"
              
             to={`/${data.title.toLowerCase()}`}
             className="text-white text-2xl font-semibold mb-3">
              {data.title}
            </MotionLink>
          </div>
        ))}

      </motion.div>
  
    </motion.nav>
  );
};

export default NavBar;
