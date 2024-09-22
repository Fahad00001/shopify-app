import { useState } from "react";
import Layout from "./Layout";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation ,Pagination} from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { useState } from "react";
const Products = () => {
  const [products, setProducts] = useState([
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/a.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/b.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/c.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/d.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/e.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/f.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/g.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/h.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/i.jpg",
    },
    {
      title: "New Blue shirt`s men",
      price: 1200,
      discount: 15,
      thumbnail: "/products/j.jpg",
    },
  ]);

  return (
    <Layout>
      <div>
        <div className="p-8 md:p-16">
          <h1 className="text-3xl font-bold text-center">All Products</h1>
          <p className="mx-auto mt-2 mb-16 text-center text-gray-600 md:w-7/12 text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            dolorem sit aliquam odit eius iste nam laudantium aspernatur
            molestiae quisquam?
          </p>
          <div className="grid gap-10 p-8 mx-auto md:w-10/12 md:grid-cols-4">
            {products.map((item, index) => (
              <div key={index} className="bg-white border shadow-lg ">
                <img src={item.thumbnail} />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <div className="space-x-2">
                    <label className="text-lg font-bold">
                      {" "}
                      ₹{item.price - (item.price * item.discount) / 100}
                    </label>
                    <del> ₹{item.price}</del>
                    <label className="text-gray-600">({item.discount}%)</label>
                  </div>
                  <button className="w-full py-2 mt-4 font-semibold text-white bg-green-600 rounded hover:bg-gray-500">
                    Buy Now
                  </button>
                  <button className="w-full py-2 mt-2 font-semibold text-white bg-orange-600 rounded hover:bg-rose-500">
                    <i className="mr-2 ri-shopping-cart-line"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Products;
