const SlotLoading = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-[#94f3b0] rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-[#94f3b0] rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-[#94f3b0] rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-[#94f3b0] rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SlotLoading;
