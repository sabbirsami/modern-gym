import a1 from "../../assets/article/a1.jpg";
import a2 from "../../assets/article/a2.jpg";
import a3 from "../../assets/article/a3.jpg";
import t1 from "../../assets/testimonial/t2.png";

const Article = () => {
    const articles = [
        {
            auth_img: t1,
            img: a1,
            title: "The Power of Mindfulness in Life",
            auth_name: "John Doe",
            date: "2023-01-15",
            tags: ["Mindfulness", "Wellness", "Self-Care"],
        },
        {
            auth_img: t1,
            img: a2,
            title: "Exploring the Wonders of Deep",
            auth_name: "Jane Smith",
            date: "2023-02-10",
            tags: ["AI", "Machine Learning", "Technology"],
        },
        {
            auth_img: t1,
            img: a3,
            title: "Healthy Eating for a Balanced Lifestyle",
            auth_name: "Alex Johnson",
            date: "2023-03-22",
            tags: ["Nutrition", "Health", "Lifestyle"],
        },
        // Add more articles as needed
    ];
    return (
        <section className="container mx-auto px-6 xl:my-32 my-20">
            <div className="">
                <h2 className="2xl:text-8xl xl:text-8xl md:text-7xl text-4xl text-center font-bold mb-6">
                    Latest News
                </h2>

                <div className="grid lg:grid-cols-3 md:grid-cols-2  md:gap-16  mt-16">
                    {articles.map((article, idx) => (
                        <div key={idx} className="">
                            <div className="bg-gradient-to-b  from-[#0C1117] to-[#303644] p-3  rounded-3xl md:mb-10 mb-20">
                                <img
                                    src={article.img}
                                    alt=""
                                    className="object-cover h-full w-full rounded-2xl"
                                />
                            </div>
                            <div className="px-6    ">
                                <h4 className="text-3xl">{article.title}</h4>
                                <div className="mt-3 flex justify-between items-end  rounded-2xl shadow-lg">
                                    <img
                                        src={article.auth_img}
                                        className="w-24"
                                        alt=""
                                    />
                                    <div className="">
                                        <h4 className="text-2xl">
                                            {article.auth_name}
                                        </h4>
                                        <p className="">{article.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-b  from-[#0C1117] to-[#303644] p-3  rounded-3xl md:mb-10 mb-20"></div>
                        </div>
                    ))}
                </div>
                <p className="text-center">Read more</p>
            </div>
        </section>
    );
};

export default Article;
