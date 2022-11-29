import * as dotenv from "dotenv";
import "../styles/globals.css";
import Layout from "../components/layout";

dotenv.config();

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
