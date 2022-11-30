import * as dotenv from "dotenv";
import "../styles/globals.css";
import Layout from "../components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

dotenv.config();

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <ToastContainer limit={1}/>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
