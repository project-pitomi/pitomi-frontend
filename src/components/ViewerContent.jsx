import { useEffect, useState } from "react";
import { Layout, Image } from "antd";
import { getAuthHeader } from "../util";

const ViewerContent = ({ id }) => {
  const { Content } = Layout;

  const [mangaFiles, setMangaFiles] = useState([]);

  useEffect(async () => {
    const fetchInfo = async (id) => {
      const endpoint = `/graphql`;
      const query = `
            query GetGallery($id: ID!) {
                gallery(id: $id) {
                    images_webp
                }
            }
            `;
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { id },
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
      return data.gallery.images_webp;
    };
    setMangaFiles(await fetchInfo(id));
  }, [id]);

  return (
    <Content>
      {mangaFiles.map((file) => {
        return <Image src={file} preview={false} />;
      })}
    </Content>
  );
};

export default ViewerContent;
