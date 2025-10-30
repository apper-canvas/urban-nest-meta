import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import propertyService from "@/services/api/propertyService";
import favoritesService from "@/services/api/favoritesService";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";

const SavedPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
loadSavedProperties();
  }, []);

const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const savedIds = await favoritesService.getFavoriteIds();
      setFavoriteIds(savedIds);

      if (savedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const allProperties = await propertyService.getAll();
      const savedProperties = allProperties.filter(p => savedIds.includes(p.Id));
      setProperties(savedProperties);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load saved properties");
    } finally {
      setLoading(false);
    }
  };

const handleToggleFavorite = async (propertyId) => {
    try {
      await favoritesService.removeFavorite(propertyId);
      toast.info("Property removed from favorites");
      await loadSavedProperties();
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadSavedProperties} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          Saved Properties
        </h1>
        <p className="text-gray-600 font-body">
          Your favorite properties all in one place
        </p>
      </div>

      {properties.length === 0 ? (
        <Empty
          title="No saved properties yet"
          message="Start browsing and save properties you like to see them here."
          action={() => navigate("/")}
          actionLabel="Browse Properties"
          icon="Heart"
        />
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600 font-body">
              <span className="font-semibold text-primary">{properties.length}</span> saved {properties.length === 1 ? "property" : "properties"}
            </p>
          </div>
          <PropertyGrid
            properties={properties}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </>
      )}
    </div>
  );
};

export default SavedPage;