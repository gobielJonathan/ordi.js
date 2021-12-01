import { Helmet } from "react-helmet-async";

export default function Image({ src, media = [], ...props }) {
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={src}></link>
      </Helmet>

      <img src={src} {...props}></img>
    </>
  );
}
