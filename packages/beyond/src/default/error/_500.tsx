export default function _500({ message }: { message: string }) {
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
        <code>{message}</code>
      </div>
    </>
  );
}
