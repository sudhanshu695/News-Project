import type { SetStateAction } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import {type Article } from "../App";

interface BlurToggle {
  isHovered: string | null;
  setIsHovered: React.Dispatch<SetStateAction<string | null>>;
}

const SmallNews: React.FC<BlurToggle> = ({ isHovered, setIsHovered}) => {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`
        );
        setData(res.data.articles);
        console.log(res.data.articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 px-8 sm:px-[72px] lg:px-[120px] pb-[72px]">
      {data.map((info) => (
        <motion.div
          key={info.url}
          onMouseEnter={() => setIsHovered(info.url)}
          onMouseLeave={() => setIsHovered(null)}
          animate={{
            scale: isHovered === info.url ? 1.1 : 1,
            opacity: isHovered === null || isHovered === info.url ? 1 : 0.4,
            filter:
              isHovered === info.url
                ? "blur(0px)"
                : isHovered
                ? "blur(2px)"
                : "blur(0px)",
          }}
          className="bg-gray-800 w-full h-full overflow-hidden shadow-lg border-0 rounded-2xl"
        >
          <img
            className="border-0 w-full h-28 object-cover"
            src={info.urlToImage}
          />

          <div className="border-0 flex flex-col justify-center bg-gray-700 text-white p-2">
            <h2 className=" text-white font-semibold ">{info.title}</h2>
            <p>{info.description?.slice(0 , 50)}...</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SmallNews;
