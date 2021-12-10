export default function _404() {
  return (
    <>
      <div
        style={{
          padding: "3rem",
        }}
      >
        <h1 style={{ borderBottom: "1px solid", paddingBottom: "10px" }}>
          404
        </h1>
        <p>Page not Found</p>

        <button onClick={() => window.location.assign(process.env.HOSTNAME)}>
          Go Home
        </button>
      </div>
    </>
  );
}
