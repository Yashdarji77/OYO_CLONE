import connectDB from "@/db";
import Hotel from "@/models/hotel-model";

export default async function handler(req, res) {
  try {
    await connectDB();

    // if (req.method === "POST") {
    //   const newHotel = new Hotel(req.body);
    //   const result = await newHotel.save();
    //   res.status(201).json({ message: "Hotel Added!", result });
    // }

    if (req.method === "GET") {
      const hotels = req.query.city
        ? await Hotel.find({ location: req.query.city })
        : await Hotel.find({});

      if (hotels.length > 0) {
        return res.status(200).json({ message: "Success", hotels });
      } else {
        return res
          .status(404)
          .json({ message: "No hotels found for the specified city." });
      }
    }

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error fetching hotels:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
