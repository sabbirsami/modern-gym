import About from "./About";
import Features from "./Features";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import Team from "./Team";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <About />
            <Testimonial />
            <Team />
            <Newsletter />
        </div>
    );
};

export default Home;
