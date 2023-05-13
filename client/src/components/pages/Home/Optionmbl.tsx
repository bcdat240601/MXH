import { all } from "axios";
import React from "react";

const Optionmbl = ({ handleShow }: any) => {
  console.log(handleShow);
  return (
    <div className="bg-thWhite w-[18.9rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-40">
      <div>
        <div className="py-4 grid place-items-center text-sm font-bold text-thMagenta border-b-[1px]">
          <button
            onClick={() =>
              alert(
                "Cảm Ơn bạn Đã Báo Cáo Chúng Tôi Sẽ Xem Xét Về Người Dùng Này"
              )
            }
          >
            Report
          </button>
        </div>
        <div className="py-4 grid place-items-center text-sm font-bold text-thDark border-b-[1px]">
          <button>Go to post</button>
        </div>
        <div
          className="py-4 grid place-items-center text-sm font-bold text-thDark"
          onClick={() => handleShow}
        >
          <button onClick={handleShow}>Cancel</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Optionmbl;
