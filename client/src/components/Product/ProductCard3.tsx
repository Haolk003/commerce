import React from "react";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
interface ProductCardProps {
  title: string;
  rating: number;
  price: number;
  discount: number;
  id: string;
  image: string;
}
const ProductCard3 = ({
  title,
  rating,
  price,
  discount,
  id,
  image,
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -5 }}
        className="flex items-center gap-2 mb-5 border-[1px] border-color-collection-pr shadow-sm px-2 py-1 rounded-md"
      >
        <img src={image} alt="" className="w-[30%]" />
        <div className="w-[70%]">
          <h2>{title}</h2>
          <div className="flex items-center gap-2">
            <Rating value={rating} name="simple-controlled" size="small" />
            <span>({rating.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg text-link-hover">
              ${(price - (price * discount) / 100).toFixed(2)}
            </span>
            <span className="text-sm text-text-color line-through">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard3;
