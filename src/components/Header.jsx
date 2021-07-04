import { Menu, Layout } from "antd";
import Link from "next/link";

const Header = ({ selectedMenu }) => {
  const { Header } = Layout;

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedMenu]}>
        <Menu.Item key="updates">
          <Link href="/">Updates</Link>
        </Menu.Item>
        <Menu.Item key="bookmarks">
          <Link href="/bookmarks">Bookmarks</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;
