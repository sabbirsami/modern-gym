import { Helmet } from "react-helmet-async";
import Loading from "../shared/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const imagesPerPage = 12;
    const totalImages = 71;

    const fetchImages = async () => {
        try {
            const response = await fetch(
                `https://fitness-tracker-server.vercel.app/api/gallery?page=${page}&limit=${imagesPerPage}`
            );
            const data = await response.json();

            if (data.length === 0 || images.length >= totalImages) {
                setHasMore(false);
                return;
            }

            setImages((prevImages) => [...prevImages, ...data]);
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <section className="container mx-auto px-6 pb-32 pt-16">
            <Helmet>
                <title>Modern Gym | Gallery</title>
            </Helmet>
            <h2 className="md:text-8xl text-6xl md:pb-16 pb-6 text-center">
                Gallery
            </h2>

            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={hasMore}
                loader={<Loading />}
            >
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((classDetail, idx) => (
                        <img
                            className="h-full object-cover"
                            key={idx}
                            src={classDetail.image}
                            alt=""
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default Gallery;
