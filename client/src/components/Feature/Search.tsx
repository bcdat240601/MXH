import React, { useState, useEffect } from "react";
import { TiDelete, TiTimes } from "react-icons/ti";
import axios from "axios";
import Link from "next/link";

const ListResults = ({ list, handle, setRecent }: any) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((item: any) => (
          <article
            key={item.id}
            className="notif_follow flex items-center py-2 px-6"
          >
            <div className="rounded-full w-11 h-11 mr-3 cursor-pointer flex-shrink-0">
              <img
                src={`${process.env.NEXT_PUBLIC_HOSTNAME}${item?.avatar?.url}`}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
            </div>
            <p className="text-sm flex-grow text-thGray">
              {!handle ? (
                <p>{item.username}</p>
              ) : (
                <Link href={`/profile/${item.id}`} legacyBehavior>
                  <a
                    onClick={() => handle(item)}
                    className="font-semibold text-thDark"
                  >
                    {item.username}
                  </a>
                </Link>
              )}

              <br />
              {item.fullname}
              {/* {state && <span className="text-thGray"> • {state}</span>} */}
            </p>
            {setRecent && (
              <div
                onClick={() => {
                  const newArr = list.filter(
                    (result: any) => item.id !== result.id
                  );
                  localStorage.setItem("search", JSON.stringify(newArr));
                  setRecent(newArr);
                }}
                className="text-gray-400 cursor-pointer"
              >
                <TiTimes size={25} />
              </div>
            )}
          </article>
        ))
      ) : (
        <div className="h-full my-auto flex justify-center items-center">
          Không có kết quả tìm kiếm
        </div>
      )}
    </>
  );
};

const Search = ({ css }: any) => {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState({
    list: [],
    loading: false,
  });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    // Perform localStorage action
    const item: any = JSON.parse(localStorage.getItem("search") || "[]");
    if (item.length > 0) setRecent(item);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (searchInput !== "") {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}users?filters[username][$contains]=${searchInput}&populate=avatar`,
          {
            signal: controller.signal,
          }
        );

        setResult({ loading: true, list: response.data });
      } else {
        setResult({ ...result, list: [] });
      }
    };

    fetchData();
    return () => {};
  }, [searchInput]);

  const handleClick = (recentData: any) => {
    console.log(recentData);
    //already filter the duplicated
    const newArr: any[] = [
      recentData,
      ...recent.filter((data: any) => data.id !== recentData.id),
    ];
    setRecent(newArr);
    localStorage.setItem("search", JSON.stringify(newArr));
    console.log("Test");
  };

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
          <div
            onClick={() => setSearchInput("")}
            className="absolute right-7 flex justify-center items-center text-xs text-gray-500 cursor-pointer"
          >
            <TiDelete size={20} />
          </div>
        </div>
      </section>
      <section className="border-t-[1px] mt-7">
        {searchInput === "" ? (
          <>
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="font-medium">Gần đây</h1>
              <p
                onClick={() => {
                  setRecent([]);
                  localStorage.setItem("search", JSON.stringify([]));
                }}
                className="text-thBlue font-medium cursor-pointer"
              >
                Xóa tất cả
              </p>
            </div>
            <div>
              <ListResults
                list={recent}
                handle={handleClick}
                setRecent={setRecent}
              />
            </div>
          </>
        ) : (
          <>
            <ListResults list={result.list} handle={handleClick} />
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
