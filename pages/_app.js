import "@/styles/globals.css";
require("dotenv").config({ path: "complete_path/.env" });

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
