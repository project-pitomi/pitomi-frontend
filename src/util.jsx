const setToken = (token) => {
  const { localStorage } = window;
  localStorage.setItem("token", token);
};

const getAuthHeader = () => {
  const { localStorage } = window;
  const token = localStorage.getItem("token");
  if (typeof token !== "string") return {};
  return { Authorization: `Bearer ${token}` };
};

const setBookmark = async (galleryId) => {
  const endpoint = `/graphql`;
  const query = `
  mutation SetBookmark($galleryId: Int!) {
    setBookmark(galleryId: $galleryId){
      isSuccess
      setBookmark{
        id
      }
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
      variables: { galleryId },
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
    return false;
  }
  return data.setBookmark.isSuccess;
};

const unsetBookmark = async (galleryId) => {
  const endpoint = `/graphql`;
  const query = `
  mutation UnsetBookmark($galleryId: Int!) {
    unsetBookmark(galleryId: $galleryId){
      isSuccess
      unsetBookmark{
        id
      }
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
      variables: { galleryId },
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
    return false;
  }
  return data.unsetBookmark.isSuccess;
};

export { setToken, getAuthHeader, setBookmark, unsetBookmark };
