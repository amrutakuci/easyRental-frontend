import React, { useEffect, useState } from 'react';
import './Login.css'
import Typography from '@mui/material/Typography';
import axios from "axios"
import AppBarSearch from './AppBarSearch';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import  {USER_REST_API_URL} from '../App'



export default function BorrowProduct(){

    const [products, setProducts] = useState([])

    const fetchData = () => {

        // const data = [{"imageURL":"https://products.shureweb.eu/shure_product_db/product_main_images/files/965/694/7d-/setcard/431ecf2b6ca723ee36939dcf321baa6e.jpeg"},
        //           {"imageURL":"https://www.lib.uci.edu/sites/all/images/active-study-zone-3.jpg"}];
        //     setProducts(data);
        //     console.log(data);
        //     console.log(products);
        axios.get(USER_REST_API_URL+"/browseProducts").then(response => {
            console.log(response.data);
            setProducts(response.data);
            
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    
    return(
        <div>
            <AppBarSearch/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Borrow Product Page
            </Typography>
            <hr></hr>
            <AliceCarousel autoPlay autoPlayInterval="3000">
                { products && products.images && products.images.map(product => (  
            
                    <img src={product} className="sliderimg"/>
            
                ))}  
                
            </AliceCarousel>
        </div>
        
    );
}
