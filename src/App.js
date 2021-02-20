import "./App.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, PageHeader, Avatar } from "antd";
import logo from "./logo.png";
import GraduateHomePage from "./pages/graduate-home-page";
import GraduateAddPage from "./pages/graduate-add-page";
import GraduateListPage from "./pages/GraduateListPage";
import GraduateProfilePage from "./pages/GraduateProfilePage";
import GraduateInfoPage from "./pages/GraduateInfoPage";
import AddGraduates from "./components/grad-add"
import NotFound from "./pages/NotFound";
import ContactForm from "./pages/ContactForm";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./pages/LoginButton";
import LogoutButton from "./pages/LogoutButton";
// import GraduateAdd from "./components/graduate-add";

const { Header, Content, Footer } = Layout;


const injectGA = () => {
  if (typeof window == "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-3Q0BC5HG21");
};

const App = () => {
  injectGA();
  return (
    <Router>
      <Layout className="layout">
        <NavBar />
        <Content style={{ padding: "0 20px" }}>
          <PageHeader
            title="Welcome to CYF Graduates Directory"
            className="site-page-header-responsive"
            breakpoint="lg"
            collapsedWidth="0"
          />
        </Content>

        <Switch>
          <Route exact path="/" component={GraduateHomePage} />
          <Route exact path="/graduates" component={GraduateListPage} />
          <Route
            exact
            path="/graduates/delete/:_id"
            component={GraduateAddPage}
          />
          <Route exact path="/graduates/new" component={ AddGraduates} />
          <Route
            exact
            path="/graduates/edit/:_id"
            component={GraduateAddPage}
          />
          <Route exact path="/graduates/:_id" component={GraduateProfilePage} />
          <Route
            exact
            path="/graduates/preview/:_id"
            component={GraduateInfoPage}
          />
          <Route exact path="/contact" component={ContactForm} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer style={{ textAlign: "center" }}>
          Copyright &copy; Code Your Future 2021
        </Footer>
      </Layout>
    </Router>
  );
};

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Header>
        <Link to="/">
          <span>
            <img src={logo} className="logo" alt="logo" />
          </span>
        </Link>

        <Menu
          style={{ float: "right" }}
          theme="dark"
          mode="horizontal"
          breakpoint="lg"
          collapsedWidth="0"
        >
          {isAuthenticated && (
            <>
             <Menu.Item>
                <Link activeClassName="active" to="/graduates/new">
                  Graduates Add
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link activeClassName="active" to="/graduates">
                  Graduates Page
                </Link>
              </Menu.Item>
              <Menu.Item><span>{user.name}</span></Menu.Item>
              <Avatar src={user.picture} />

              <Menu.Item>
                <LogoutButton />
              </Menu.Item>
            </>
          )}
          {!isAuthenticated && (
            <Menu.Item>
              <LoginButton />
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </>
  );
};

export default App;
