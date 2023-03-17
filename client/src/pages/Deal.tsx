import React, { useEffect, useRef, useState } from "react";
import { ProductCard } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getProductSelling } from "../features/products/ProductSlice";
const Deal = () => {
  const lastElementRef = useRef<any>();
  const timeoutRef = useRef<any>();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNumber(pageNumber + 1);
      }
    })
  );
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.sellingProducts);
  useEffect(() => {
    // clearTimeout(timeoutRef.current);
    // timeoutRef.current = setTimeout(() => {

    dispatch(getProductSelling(pageNumber));
    setData((item) => [...item, ...products]);
    console.log(pageNumber);
    // }, 500);
  }, [pageNumber]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, []);
  return (
    <div className="grid grid-cols-5 w-full px-10 py-5 relative gap-5">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={item._id}>
              <ProductCard
                discount={item?.sale.discount}
                images={item.images}
                title={item.title}
                category={item.category}
                price={item.price}
                rating={item.totalRating}
                id={item._id}
                key={item._id}
                ratings={item.ratings}
                quatity={item?.quatity}
              />
            </div>
          );
        })}
      <div className="absolute bottom-0 h-2" ref={lastElementRef}></div>
    </div>
  );
};

export default Deal;
