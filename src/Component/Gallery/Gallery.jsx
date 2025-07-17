import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Gallery.css'


const Gallery = (props) => {
  const [data, setData] = useState([])
  useEffect(()=>{
    props.showLoader()
      const fetchData = async() => {
        axios.get("http://localhost:4000/api/gallery/get").then((response) => {
          
          setData(response.data.gallery)
        }).catch(err => {
          toast.error(err?.response?.data?.error)
        }).finally(() => {
          props.hideLoader()
        })
      }
       fetchData()
    },[])
  return (
    <div className='Gallery'>
      {data.map((item,index) => {
        return( <div key={index} className='G-img-block'>
        <img className= 'G-img' src={item.link} alt="" />
      </div>)
      })}
     

      
    </div>
  )
}

export default Gallery