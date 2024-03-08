"use client";

import { categoriesData } from "../data";
import { BrowserRouter as Link } from "react-router-dom";
export default function CategoriesList() {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categoriesData &&
        categoriesData.map((category) => (
          <Link to={`/categories/${category.name}`} key={category.id}>
            <div className="px-4 py-1 rounded-md bg-slate-800 text-white">
              {category.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
