import { object } from "prop-types";

export default function _404({ staticContext }) {
  staticContext.status = 404;
  return <h1>not found</h1>;
}

_404.propTypes = {
  staticContext: object,
};

_404.defaultProps = {
  staticContext: {},
};
