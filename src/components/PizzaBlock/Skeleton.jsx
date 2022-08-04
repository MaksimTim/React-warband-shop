import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className={"pizza-block"}
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="30" />
    <rect x="183" y="312" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="335" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="440" rx="10" ry="10" width="95" height="30" />
    <rect x="124" y="440" rx="25" ry="25" width="152" height="45" />
    <rect x="31" y="459" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default Skeleton;
