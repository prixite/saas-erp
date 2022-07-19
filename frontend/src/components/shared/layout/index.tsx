import PropTypes from "prop-types";
import Topbar from "./Topbar";

const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <Topbar />
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
