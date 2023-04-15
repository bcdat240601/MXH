import React from "react";
import Images from "../assets/images";
const Notification = ({ css }: any) => {
  return (
    <div>
      <div
        className={`absolute bg-white h-full w-[25rem] ${css} z-30 overflow-y-auto will-change-transform origin-left transition duration-500`}
      >
        <h1 className="font-bold text-2xl py-5 px-6">Thông Báo</h1>
        <section className="notif px-6">
          <article className="notif_follow flex items-center py-2">
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.av4.default.src}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <span className="text-sm flex-grow">
              <span className="font-semibold">ChuongSki </span> đã bắt đầu theo
              dõi bạn. <span className="text-thGray">5 tuần</span>
            </span>
            <button className="w-24 ml-3 bg-thBlue text-sm text-white font-medium px-2 py-1.5 rounded-md flex-shrink-0">
              Theo dõi
            </button>
          </article>
          <article className="notif_follow flex items-center py-2">
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.av3.default.src}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <span className="text-sm flex-grow">
              <span className="font-semibold">ChuongBoi </span> đã bắt đầu theo
              dõi bạn. <span className="text-thGray">5 tuần</span>
            </span>
            <button className="w-[6.859rem] ml-3 bg-thGraytwo text-sm text-thDark font-medium px-2 py-1.5 rounded-md flex-shrink-0">
              Đang theo dõi
            </button>
          </article>
          <article className="notif_follow flex items-center py-2">
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.av1.default.src}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <span className="text-sm flex-grow">
              <span className="font-semibold">Buong.ngxn </span> đã bắt đầu theo
              dõi bạn. <span className="text-thGray">5 tuần</span>
            </span>
            <button className="w-[6.859rem] ml-3 bg-thGraytwo text-sm text-thDark font-medium px-2 py-1.5 rounded-md flex-shrink-0">
              Đã yêu cầu
            </button>
          </article>
          <article className="notif_comment-like flex items-center py-2">
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.av1.default.src}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <span className="text-sm flex-grow">
              <span className="font-semibold">Buong.ngxn </span> đã bình luận về
              bài viết của bạn. <span className="text-thGray">5 tuần</span>
            </span>
            <div className="rw-11 h-11 ml-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.photo1.default.src}
                alt=""
                className="w-11 h-11 object-cover"
              />
            </div>
          </article>
          <article className="notif_comment-like flex items-center py-2">
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.av3.default.src}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <span className="text-sm flex-grow">
              <span className="font-semibold">ChuongBoi </span> đã thích bài
              viết của bạn. <span className="text-thGray">5 tuần</span>
            </span>
            <div className="rw-11 h-11 ml-3 cursor-pointer flex-shrink-0">
              <img
                src={Images.photo2.default.src}
                alt=""
                className="w-11 h-11 object-cover"
              />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Notification;
