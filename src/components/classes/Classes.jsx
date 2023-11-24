import AllClasses from "./AllClasses";
import WeeklyClasses from "./WeeklyClasses";

const Classes = () => {
    return (
        <section className="container mx-auto px-6 py-32">
            <WeeklyClasses />
            <AllClasses />
        </section>
    );
};

export default Classes;
