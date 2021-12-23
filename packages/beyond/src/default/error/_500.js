export default function _500({ message }) {
  return (
    <>
      <div
        style={{
          padding: "3rem",
        }}
      >
        <h1 style={{ borderBottom: "1px solid", paddingBottom: "10px" }}>
          500
        </h1>
        <p>{message}</p>

        <button onClick={() => window.location.assign(process.env.HOSTNAME)}>
          Go Home
        </button>
      </div>
    </>
  );
}
