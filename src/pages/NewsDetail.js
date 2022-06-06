import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import{filterCategory}from '../store/slices/news.slice'
import {Card,Row, Col} from "react-bootstrap";



const NewsDetail = () => {
const[news,setNews]=useState({})

const{id}=useParams()
const dispatch=useDispatch()

const newsList=useSelector(state=>state.news)
useEffect(()=>{

    axios.get(`https://news-app-academlo.herokuapp.com/news/`)
    .then(res=>{

      const newsSearched=res.data.find(newsItem=>newsItem.id===Number(id))
        setNews(newsSearched);
      dispatch(filterCategory(res.data.category.id))
   
    })
},[dispatch,id])
    return (
      <div>
        <h1>{news.headline}</h1>
        <img src={news.image} alt="" className="fluid-img" />
        <div>
          <h2>Sugerencias</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
          {newsList.map((newsItem) => (
            <Col>
              <Card style={{ cursor: "pointer" }}>
                <Card.Img variant="top" src={newsItem.image} />
                <Card.Body>
                  <Card.Title>{newsItem.headline}</Card.Title>
                  <Card.Text>{newsItem.lead}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {newsItem.date}
                </Card.Footer>
              </Card>
            </Col>
          ))}
          </Row>
        </div>
      </div>
    );
};

export default NewsDetail;