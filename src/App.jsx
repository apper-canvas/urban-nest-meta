import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "@/router/index";
import Header from "@/components/organisms/Header";
import BrowsePage from "@/components/pages/BrowsePage";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import SavedPage from "@/components/pages/SavedPage";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;