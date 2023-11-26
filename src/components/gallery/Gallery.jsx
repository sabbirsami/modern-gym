import { Helmet } from "react-helmet-async";

const Gallery = () => {
    return (
        <section className="container mx-auto px-6 py-32">
            <Helmet>
                <title>Modern Gym | Gallery</title>
            </Helmet>
            <h2 className="md:text-8xl text-6xl md:pb-16 pb-6">Gallery</h2>
        </section>
    );
};

export default Gallery;
