import Image from "next/image";
import Link from "next/link";

const Hotel = ({ e }) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg h-auto mb-5 p-5 overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div className="flex">
        <Image
          src={e?.banner}
          alt="hotel"
          width={300}
          height={200}
          className="w-72 h-48 rounded-lg object-cover mr-3"
          unoptimized
        />
        <div className="flex flex-col justify-between ml-3">
          <div className="flex-grow">
            <h2 className="font-bold text-2xl line-clamp-1">{e?.name}</h2>
            <p className="text-justify my-2 text-base">{e?.description}</p>
          </div>
          <div className="text-2xl my-2">
            <span className="font-bold">Facilities:</span>
            <ul className="flex my-2">
              {e
                ? e.facilities?.map((ele) => (
                    <li key={ele.name} className="mr-8 flex items-center">
                      <Image
                        src={ele.img}
                        alt="facility"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">{ele.name}</span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        {e
          ? e.gallery?.map((ele) => (
              <Image
                key={ele}
                src={ele}
                alt="hotel gallery"
                width={100}
                height={75}
                className="w-24 h-16 object-cover rounded-md mr-2"
                unoptimized
              />
            ))
          : ""}
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="w-32 h-10 rounded-lg bg-blue-500 text-white text-base hover:bg-blue-600 transition duration-300 mr-2">
          Price: &#8377; {e?.price}
        </button>
        <Link
          href={`/hotels/${e?._id}`}
          className="text-base font-bold text-red-600 hover:underline flex-none"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default Hotel;
