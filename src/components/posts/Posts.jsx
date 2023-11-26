import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { useState } from "react";
import Post from "./Post";

const Posts = () => {
    const [page, setPage] = useState(0);
    const axiosPublic = useAxiosPublic();
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["posts", page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?page=${page}&limit=${6}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>;
    }
    const pages = [...new Array(4).fill(0)];
    console.log(pages);
    console.log(posts);

    const handleNext = () => {
        setPage(page + 1);
    };
    const handlePre = () => {
        setPage(page - 1);
    };
    return (
        <section className="container mx-auto px-6 pb-32 pt-16">
            <Helmet>
                <title>Modern Gym | Posts</title>
            </Helmet>
            <h2 className="md:text-8xl text-6xl md:pb-16 pb-6">Posts</h2>
            <div className="grid gap-6">
                {posts.map((post, idx) => (
                    <Post key={idx} post={post}></Post>
                ))}
            </div>
            <div className=" pt-16">
                <div className="text-center space-x-2">
                    <button
                        disabled={page == 0}
                        className=" h-10 px-4  rounded-full bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black disabled:opacity-40"
                        onClick={handlePre}
                    >
                        Previous
                    </button>

                    <button
                        disabled={page == 3}
                        className="h-10 px-4 rounded-full  bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black disabled:opacity-40"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Posts;
