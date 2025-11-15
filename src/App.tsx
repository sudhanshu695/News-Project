
import { useState } from "react"
import NavBar from "./Comonents/NavBar"
import "./index.css"
import Headline from "./Comonents/Headline";
import NewsLayout from "./Comonents/NewsLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}


function App() {

  const [isOpen , setIsOpen] = useState<boolean>(false);

  const [data, setData] = useState<Article[]>([]);

  return (
    <>
       <Headline isOpen={isOpen} />
        <BrowserRouter>
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>
          <Routes>
            <Route path="/" element={<NewsLayout country='us' category='general' data={data} setData={setData} />} />
            <Route path="/technology" element={<NewsLayout country='us' category='technology' data={data} setData={setData} />} />
            <Route path="/sports" element={<NewsLayout country='us' category='sports' data={data} setData={setData} />} />
            <Route path="/entertainment" element={<NewsLayout country='us' category='entertainment' data={data} setData={setData} />} />
            <Route path="/science" element={<NewsLayout country='us' category='science' data={data} setData={setData} />} />
            <Route path="/business" element={<NewsLayout country='us' category='business' data={data} setData={setData} />} />
            <Route path="/health" element={<NewsLayout country='us' category='health' data={data} setData={setData} />} />
            <Route path="/general" element={<NewsLayout country='us' category='general' data={data} setData={setData} />} />
          </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
