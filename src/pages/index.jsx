import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import { getAuthHeader, setBookmark, unsetBookmark } from "../util";

function Index() {
  const router = useRouter();
  const [galleries, setGalleries] = useState([]);
  const [totalCount, setTotalCount] = useState(1000);

  const page = parseInt(router.query.page) || 1;
  const { artists, groups, types, series, characters, tags } = JSON.parse(
    router.query.filter || "{}"
  );

  useEffect(async () => {
    if (!router.isReady) return;
    const endpoint = `/graphql`;
    const query = `
    query GetGalleries($offset: Int!, $artists: [String!], $groups: [String!], $types: [String!], $series: [String!], $characters: [String!], $tags: [InputTag!]) {
      galleries(offset: $offset, artists: $artists, groups: $groups, types: $types, series: $series, characters: $characters, tags: $tags) {
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

    const fetch_galleries = async (
      page,
      artists,
      groups,
      types,
      series,
      characters,
      tags
    ) => {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            offset: (page - 1) * 10,
            artists,
            groups,
            types,
            series,
            characters,
            tags,
          },
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
        totalCount: data.galleries.totalCount,
        galleries: data.galleries.edges.map((edge) => edge.node),
      };
    };
    const { totalCount, galleries } = await fetch_galleries(
      page,
      artists,
      groups,
      types,
      series,
      characters,
      tags
    );
    setGalleries(galleries);
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
      setGalleries(
        galleries.map((gallery) => {
          if (gallery.id === galleryId) {
            return { ...gallery, isBookmarked: false };
          }
          return gallery;
        })
      );
    }
  };

  return (
    <Layout hasSider={false}>
      <Header selectedMenu="updates" />
      <Content
        mangas={galleries}
        menu={"updates"}
        currentPage={page}
        totalCount={totalCount}
        onBookmarkChanged={onBookmarkChanged}
      />
      <Footer />
    </Layout>
  );
}

export default Index;
