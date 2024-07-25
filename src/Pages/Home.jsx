import React from 'react'
import {useState , useEffect} from "react";
import Spinner from "../Components/Spinner";
import Product from "../Components/Product";

export const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading , setLoading] = useState(false);
  const [posts , setPosts] = useState([]);

  async function fetchProductData(){
    setLoading(true);

    try{
        const res = await fetch(API_URL);
        const data = await res.json();

        setPosts(data);
    }
    catch(error) {
        console.log("Error! Can't fetch");
        setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  } , [])



  return (
    <div>
        {
            loading ? <Spinner/> : 
            posts.length > 0 ?
            (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
        gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
               { 
                posts.map((post) => (
                    <Product key={post.id} post={post}
                        
                    />
                ) )
                }
            </div>):
            <div className="w-screen h-screen flex justify-center items-center">
                <p className="font-bold"> No Data found</p>
            </div>
        }
    </div>
  );
};
