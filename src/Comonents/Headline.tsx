import { motion } from "framer-motion";




const Headline = ({ isOpen }: { isOpen: boolean }) => {


  return (


    <motion.div className="bg-blue-300 w-full h-14 flex justify-center items-center"
      animate={{ marginTop: isOpen ? "12rem" : "5.6rem" }} // Same height as navbar
      transition={{ duration: isOpen ? 0.6: 0 , ease : 'easeInOut' }}
    >

        <motion.h2 className="font-semibold text-xl text-gray-900">The President Of India Modi banned mcDonald saying its beacuse of 'Donald' trump </motion.h2>
         
    </motion.div>
  );
};

export default Headline;
