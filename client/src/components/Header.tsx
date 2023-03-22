import React from "react";
import { BiBell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
const Header = () => {
  return (
    <div>
      {/* mobile header */}
      <div className="flex justify-between items-center py-6 px-4">
        <p className="font-normal text-xl logo">Photogram</p>
        <div className="flex gap-x-3">
          <div className="circle w-14 h-14 rounded-full grid place-items-center bg-white">
            <BiBell size={23} />
          </div>
          {/* <div className='circle w-14 h-14 rounded-full grid place-items-center text-thBlue'>
                    <BsFillPlusSquareFill size={23}/>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
