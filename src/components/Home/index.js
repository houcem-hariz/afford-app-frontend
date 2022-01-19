import React from 'react'
import stores from '../../images/stores.png'
import categories from '../../images/categories.png'
import products from '../../images/products.png'
export default function Home() {
    return (
        <div className='container'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Stores"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Categories"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Products"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={stores} className="d-block w-300" alt="stores image" />
                        <h2 className='text-center'>A powerful management tool for your business</h2>
                    </div>
                    <div className="carousel-item">
                        <img src={categories} className="d-block w-300" alt="categories image" />
                        <h2 className='text-center'>Track all your stores, categories and products</h2>
                    </div>
                    <div className="carousel-item">
                        <img src={products} className="d-block w-300" alt="products image" />
                        <h2 className='text-center'>Have a total control over your business</h2>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
