import React from "react";
import dynamic from "next/dynamic";

const PostPageComponent = dynamic(() => import("./PostPage"), { ssr: false });

const page = () => {
  return (
    <div>
      <PostPageComponent />
    </div>
  );
};

export default page;
