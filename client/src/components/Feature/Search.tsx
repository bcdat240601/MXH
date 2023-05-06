import React, { useState, useEffect } from "react";
import { TiDelete, TiTimes } from "react-icons/ti";
import Images from "../../assets/images";
import axios from "axios";
const Search = ({ css }: any) => {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState({ list: [], loading: false });

  console.log(searchInput);
  // const list = [
  //   {
  //     id: 1,
  //     img: Images.av3.default.src,
  //     username: "ChuongLove",
  //     name: "Chưởng Bối",
  //     state: "Đang theo dõi",
  //   },
  //   {
  //     id: 2,
  //     img: Images.av2.default.src,
  //     username: "ChuongNguyden",
  //     name: "BÉ Chương Nguyễn",
  //   },
  // ];

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (searchInput !== "") {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}users?filters[username][$contains]=${searchInput}`,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setResult({ loading: true, list: response.data });
      } else {
        setResult({ ...result, list: [] });
      }
    };

    fetchData();
    return () => {};
  }, [searchInput]);

  return (
    <div
      className={`absolute bg-white h-full w-[25rem] ${css} z-10 overflow-y-auto will-change-transform origin-left transition duration-500`}
    >
      <h1 className="font-medium text-2xl py-5 px-6">Tìm kiếm</h1>
      <section>
        <div className="w-full grid place-items-center">
          <input
            type="text"
            className="bg-thGraytwo w-[90%] py-2 px-3 rounded-md text-sm relative"
            placeholder="Tìm kiếm"
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
          />
          <div className="absolute right-7 flex justify-center items-center text-xs text-gray-500">
            <TiDelete
              className={"cursor-pointer"}
              onClick={() => setSearchInput("")}
              size={20}
            />
          </div>
        </div>
      </section>
      <section className="border-t-[1px] mt-7">
        {result.list.length === 0 ? (
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="font-medium">Gần đây</h1>
            <p className="text-thBlue font-medium">Xóa tất cả</p>
          </div>
        ) : (
          <>
            {result.list.map(({ id, img, username, name, state, fullname }) => (
              <article
                key={id}
                className="notif_follow flex items-center py-2 px-6"
              >
                <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
                  <img
                    src={img}
                    alt=""
                    className="rounded-full w-11 h-11 object-cover"
                  />
                </div>
                <p className="text-sm flex-grow text-thGray">
                  <a
                    href={`/profile/${id}`}
                    className="font-semibold text-thDark"
                  >
                    {username}
                  </a>
                  <br></br>
                  {fullname}{" "}
                  {state && <span className="text-thGray"> • {state}</span>}
                </p>
                <div className="text-gray-400">
                  <TiTimes size={25} />
                </div>
              </article>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
