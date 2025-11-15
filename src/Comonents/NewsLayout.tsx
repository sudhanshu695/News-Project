import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import axios from "axios";
import {type Article } from "../App";
import SmallNews from "./SmallNews";

export interface PropsType {
    country : string;
    category : string;
    data : Article[];
    setData: React.Dispatch<React.SetStateAction<Article[]>>;
}

const NewsLayout : React.FC<PropsType> = ({country, category, data ,setData}) => {

  const [isHovered, setIsHovered] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;


  const fetchData = async() => {
    setLoading(true);
    try{
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`);
        setData(res.data.articles)
        console.log(res.data.articles);
    } 
    catch (error) {
         console.error(error)
    }
    finally{
        setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  },[category])

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div>
      <motion.div className="border-0 grid mt-10 grid-cols-1 sm:grid-cols-2 z-0 lg:grid-cols-3 gap-6 p-[150px]">
        {data.map((info) => (
          <motion.div
            key={info.url}
            onHoverStart={() => setIsHovered(info.url)}
            onHoverEnd={() => setIsHovered(null)}
            animate={{
              
              scale: isHovered === info.url ? 1.1 : 1,
              opacity: isHovered === null || isHovered === info.url ? 1 : 0.4,
              filter:
                isHovered === info.url
                  ? "blur(0px)"
                  : isHovered
                  ? "blur(1px)"
                  : "blur(0px)",
            }}
            transition={{type : 'spring' , stiffness : 300 }}
            className="bg-gray-800 overflow-hidden shadow-lg rounded-2xl"
          >
            <img
              className="border-0 w-full h-48 text-white rounded-2xl object-cover"
              src={info.urlToImage}
              alt={info.title}
            />

            <div className="flex flex-col gap-2 h-full bg-gray-700 text-white p-4">
              <h2 className=" text-white font-semibold text-lg">
                {info.title}
              </h2>
              <p>{info.description?.slice(0,90)} <span className="text-blue-500">read more..</span></p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
     <SmallNews isHovered={isHovered} setIsHovered={setIsHovered} />
    </div>
  );
};

export default NewsLayout;
