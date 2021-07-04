import { useRouter } from "next/router";
import { Layout } from "antd";
import ViewerHeader from "../../components/ViewerHeader";
import ViewerContent from "../../components/ViewerContent";
import ViewerFooter from "../../components/ViewerFooter";

const Viewer = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id } = router.query;

  return (
    <Layout hasSider={false}>
      <ViewerHeader />
      <ViewerContent id={id} />
      <ViewerFooter />
    </Layout>
  );
};

export default Viewer;
