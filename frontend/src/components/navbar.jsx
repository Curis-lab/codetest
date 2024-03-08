import { Link } from 'react-router-dom';

import add from '../assets/add.svg';

const Navbar = () => {

  return (
    <div className="flex justify-between pb-4 border-b mb-4">
      <div className="">
        <Link to={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">
          Exploring tomorrow&apos;s Invotions&#39;
          <br /> One Byte at a Time.
        </p>
      </div>
      <div className="flex items-center">
        <Link
          className="flex gap-2 m-2 cursor-pointer"
          to="/create-post"
        >
          <span>
            <img src={add} alt="add" width={25} height={25} />
          </span>
          create Page
        </Link>
        <Link className="btn" to="/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
