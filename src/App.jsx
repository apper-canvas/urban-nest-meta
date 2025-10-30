import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import BrowsePage from "@/components/pages/BrowsePage";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import SavedPage from "@/components/pages/SavedPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/saved" element={<SavedPage />} />
          </Routes>
        </main>
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
      </div>
    </BrowserRouter>
  );
}

export default App;