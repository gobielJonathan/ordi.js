export default ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>not found</h1>;
};
