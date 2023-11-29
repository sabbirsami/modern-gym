import PropTypes from "prop-types";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Post = ({ post, refetch }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const axiosPublic = useAxiosPublic();
    const {
        _id,
        postImage,
        title,
        author,
        authImage,
        content,
        timestamp,
        views,
        role,
        likeCount,
        postTag,
        commentsCount,
    } = post;
    const handleLike = (id) => {
        if (!user) {
            navigate("/sign-in");
        } else {
            axiosPublic
                .put(`posts/${id}`, { likeCount: likeCount + 1 })
                .then((res) => {
                    console.log(res.data);

                    refetch();
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log(id);
            setLiked(true);
        }
    };
    const handleDislike = (id) => {
        console.log(id);
        setLiked(false);
    };

    return (
        <div className="p-6 bg-[#303644] rounded-xl">
            <div className="flex gap-10">
                <div className="">
                    <img
                        className="w-60 h-48 rounded-lg object-cover"
                        src={postImage}
                        alt=""
                    />
                </div>
                <div className="px-6  grow ">
                    <div className="flex justify-between gap-10">
                        <div className="">
                            <h3 className="text-3xl">{title}</h3>
                            <p className="pt-1 text-sm">{content}</p>
                        </div>
                        <div className="">
                            {liked ? (
                                <button
                                    onClick={() => handleDislike(_id)}
                                    className="text-2xl"
                                >
                                    <GoHeartFill />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleLike(_id)}
                                    className="text-2xl"
                                >
                                    <GoHeart />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <p className="py-2 px-3 me-1.5 mb-1.5 inline-block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5] mt-3">
                            {postTag}
                        </p>
                        <p className="py-2 px-3 me-1.5 mb-1.5 inline-block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5] mt-3">
                            Gym
                        </p>
                        <p className="py-2 px-3 me-1.5 mb-1.5 inline-block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5] mt-3">
                            Health
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-6 items-center grow">
                            <img
                                className="w-16 h-16 rounded-3xl p-0.5 bg-slate-600 object-cover"
                                src={authImage}
                                alt=""
                            />
                            <div className="">
                                <h4 className="text-xl">{author}</h4>
                                <div className="flex items-center">
                                    {" "}
                                    <p className="text-xs text-white/80  px-1.5 py-0.5 border me-3 rounded-full">
                                        {role}
                                    </p>
                                    <p className="text-xs text-white/80">
                                        {timestamp}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="ps-10">{views + 1560} Views</p>
                        <p className="ps-10">{commentsCount + 15} Comments</p>
                        <p className="ps-10">{likeCount + 160} Likes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

Post.propTypes = {
    post: PropTypes.object,
    refetch: PropTypes.func,
};
