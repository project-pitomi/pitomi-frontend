import { Layout } from "antd";

import Search from "./Search";
import Mangas from "./Mangas";
import Navigation from "./Navigation";

const Content = ({
  menu,
  mangas,
  bookmarks,
  currentPage,
  totalCount,
  onBookmarkChanged,
}) => {
  const { Content } = Layout;

  const contentByMenu = {
    updates: (
      <Mangas
        mangas={mangas}
        prefetch={false}
        onBookmarkChanged={onBookmarkChanged}
      />
    ),
    bookmarks: (
      <Mangas
        mangas={bookmarks}
        prefetch={true}
        onBookmarkChanged={onBookmarkChanged}
      />
    ),
  };

  return (
    <Content>
      {menu === "updates" ? <Search /> : <></>}
      {contentByMenu[menu]}
      <Navigation currentPage={currentPage} total={totalCount} />
    </Content>
  );
};

export default Content;
