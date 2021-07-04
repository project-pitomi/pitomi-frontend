import { useState, useEffect } from "react";
import { Layout } from "antd";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import { getAuthHeader, setBookmark, unsetBookmark } from "../util";

function Bookmarks() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const page = parseInt(router.query.page) || 1;

  useEffect(async () => {
    const fetchBookmarks = async (page) => {
      const endpoint = `/graphql`;
      const query = `
      query getBookmarks($offset: Int, $count: Int) {
        bookmarks(offset: $offset, count: $count) {
          totalCount
          edges {
            node {
              id
              title
              artists
              group
              type
              series
              characters
              origin_at
              tags {
                tag
                male
                female
              }
              thumbnail_webp
              isBookmarked
            }
          }
        }
      }
      `;

      const offset = (page - 1) * 10;
      const count = 10;

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { offset, count },
        }),
      });
      const { data, errors } = await resp.json();
      if (errors) {
        if (
          errors.some((element) => {
            return element.message === "Authentication failed";
          })
        ) {
          router.push("/login");
        }
        return [];
      }
      return {
        totalCount: data.bookmarks.totalCount,
        bookmarks: data.bookmarks.edges.map((edge) => edge.node),
      };
    };
    const { totalCount, bookmarks } = await fetchBookmarks(page);
    setBookmarks(bookmarks);
    setTotalCount(totalCount);
  }, [router.isReady, router.query]);

  const onBookmarkChanged = async (galleryId, bookmarkState) => {
    if (bookmarkState) {
      const isSuccess = await setBookmark(galleryId);
      setGalleries(
        galleries.map((gallery) => {
          if (gallery.id === galleryId) {
            return { ...gallery, isBookmarked: true };
          }
          return gallery;
        })
      );
    } else {
      const isSuccess = await unsetBookmark(galleryId);
      setBookmarks(
        bookmarks.filter((gallery) => {
          return gallery.id !== galleryId;
        })
      );
    }
  };

  return (
    <Layout hasSider={false}>
      <Header selectedMenu="bookmarks" />
      <Content
        bookmarks={bookmarks}
        menu={"bookmarks"}
        onBookmarkChanged={onBookmarkChanged}
        totalCount={totalCount}
      />
      <Footer />
    </Layout>
  );
}

export default Bookmarks;
