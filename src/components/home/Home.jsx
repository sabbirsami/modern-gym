import About from "./About";
import Article from "./Article";
import Classes from "./Classes";
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
            <Classes />
            <About />
            <Newsletter />
            <Team />
            <Testimonial />
            <Article />
        </div>
    );
};

export default Home;
