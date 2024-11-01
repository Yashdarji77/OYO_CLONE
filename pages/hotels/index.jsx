import Filters from "@/components/Filters";
import Header1 from "@/components/Header1";
import Hotel from "@/components/Hotel";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";

const Hotels = ({ hotels }) => {
  const [price, setPrice] = useState(3500);
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const handleCheckList = useCallback(async () => {
    const { data } = await axios.get(
      `/api/facilities/search?val=${checkedList}`
    );
    if (data?.hotels) {
      setList(data.hotels);
    }
  }, [checkedList]);

  useEffect(() => {
    if (checkedList) {
      handleCheckList();
    }
  }, [checkedList, handleCheckList]);

  const handlePrice = async () => {
    const { data } = await axios.get(`/api/facilities/range?price=${price}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };
  return (
    <>
      <Head>
        <title>OYO - Hotels</title>
      </Head>
      <Header1 />
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Filters
            price={price}
            setPrice={setPrice}
            handlePrice={handlePrice}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="col-span-9">
          {list.length > 0
            ? list.map((e) => {
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : hotels
            ? hotels.map((e) => {
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/hotels?city=${encodeURIComponent(
        ctx.query.city
      )}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch hotels");
    }

    const data = await res.json();

    return {
      props: {
        hotels: data.hotels ? data.hotels : data.allhotels,
      },
    };
  } catch (error) {
    console.error("Error fetching hotels:", error.message);
    return {
      props: {
        hotels: [],
        error: "Failed to load hotels",
      },
    };
  }
}

export default Hotels;
