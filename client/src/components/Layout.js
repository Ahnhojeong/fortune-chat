import layoutStyles from "../styles/Layout.module.css";

function Layout(props) {
  return (
    <div className={layoutStyles.layout}>
      <div className={layoutStyles.background_image}></div>
      <>{props.children}</>
    </div>
  );
}

export default Layout;
