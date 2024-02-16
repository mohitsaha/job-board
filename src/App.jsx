import { useEffect, useState } from 'react'
import fetchApi from './utils/FetchApi'
import './App.css'

function App() {
  const [ids,setIds] = useState([]);
  const [newsObject,setNewsObject] = useState([]);
  useEffect(()=>{
   let ans = fetchApi("https://hacker-news.firebaseio.com/v0/jobstories.json");
      ans
      .then((res)=>{ 
       setIds(res);
       return res;
      }).then((res)=>{
        let initialData = res.slice(0,5);

        let allPromises = initialData.map((id)=>{
          return fetchApi(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        })

        Promise.all(allPromises).then((e)=>{
          setNewsObject([...newsObject,...e])
        })
      })
   },[])

  const handleClick = ()=>{
    let start = newsObject.length;
    let comingData = ids.slice(start,start+5);
    let allPromises = comingData.map((id)=>{
      return fetchApi(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    })

    Promise.all(allPromises).then((e)=>{
      setNewsObject([...newsObject,...e])
    })
   }
  return (
    <>
    <div> 
     {newsObject?.map(e=><div>{e.title}</div>)}
    </div>
    <button disabled={newsObject.length == ids.length ? "true":"false"}  onClick={handleClick}>load more news</button>
    </>
  )
}

export default App
