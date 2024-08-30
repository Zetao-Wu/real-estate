import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-700">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[700px] w-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                ></div>
                {/* <div
                  className="h-[550px] w-full bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundSize: "contain", // Ensure the entire image is visible
                    backgroundPosition: "center", // Center the image
                  }}
                ></div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
