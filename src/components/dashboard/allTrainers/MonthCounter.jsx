import PropTypes from "prop-types";

const MonthCounter = ({ joiningDate }) => {
    const getMonthCount = (joiningDate) => {
        // Split the joining date string into an array [MM, DD, YYYY]
        const [month, day, year] = joiningDate.split("-");
        const joinDate = new Date(`${year}-${month}-${day}`);

        // Get the current date
        const currentDate = new Date();

        // Calculate the difference in months
        const monthDiff =
            (currentDate.getFullYear() - joinDate.getFullYear()) * 12 +
            (currentDate.getMonth() - joinDate.getMonth());

        return monthDiff;
    };

    const monthsSinceJoining = getMonthCount(joiningDate);

    return <span> {monthsSinceJoining}</span>;
};

export default MonthCounter;
MonthCounter.propTypes = {
    joiningDate: PropTypes.string,
};
