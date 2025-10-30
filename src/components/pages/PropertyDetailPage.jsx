import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import propertyService from "@/services/api/propertyService";
import favoritesService from "@/services/api/favoritesService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ImageGallery from "@/components/organisms/ImageGallery";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import PriceTag from "@/components/molecules/PriceTag";
import PropertyStats from "@/components/molecules/PropertyStats";
import FavoriteButton from "@/components/molecules/FavoriteButton";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadProperty();
    checkFavorite();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(id);
      setProperty(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load property details");
    } finally {
      setLoading(false);
    }
  };
const checkFavorite = async () => {
    const isFav = await favoritesService.isFavorite(parseInt(id));
    setIsFavorite(isFav);
  };

const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(parseInt(id));
        toast.info("Property removed from favorites");
      } else {
        await favoritesService.addFavorite(parseInt(id));
        toast.success("Property added to favorites");
      }
      setIsFavorite(!isFavorite);
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  const handleContact = () => {
    toast.success("Contact form opened");
  };

  if (loading) return <Loading type="detail" />;
  if (error) return <Error message={error} onRetry={loadProperty} />;
  if (!property) return <Error message="Property not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
        Back to Properties
      </Button>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageGallery images={property.images_c} alt={property.title_c} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <PriceTag price={property.price_c} />
                  <Badge variant="primary">{property.property_type_c}</Badge>
                  <Badge variant="secondary">{property.listing_type_c}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
                  {property.title_c}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <ApperIcon name="MapPin" size={20} className="text-primary" />
                  <span className="font-body">
                    {property.address_c}, {property.city_c}, {property.state_c} {property.zip_code_c}
                  </span>
                </div>
                <PropertyStats
                  bedrooms={property.bedrooms_c}
                  bathrooms={property.bathrooms_c}
                  squareFeet={property.square_feet_c}
                  size="lg"
                  className="mt-2"
                />
              </div>
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={handleToggleFavorite}
                size="lg"
              />
            </div>

<div className="prose max-w-none mt-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line font-body">
                {property.description_c}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities_c?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
                  >
                    <ApperIcon name="Check" size={18} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-body text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

<div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-white shadow-card">
                <p className="text-sm text-gray-600 mb-1">Year Built</p>
                <p className="text-lg font-display font-bold text-gray-900">{property.year_built_c}</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-card">
                <p className="text-sm text-gray-600 mb-1">Parking</p>
                <p className="text-lg font-display font-bold text-gray-900">{property.parking_c}</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-card">
                <p className="text-sm text-gray-600 mb-1">Pet Friendly</p>
                <p className="text-lg font-display font-bold text-gray-900">
                  {property.pet_friendly_c ? "Yes" : "No"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-card">
                <p className="text-sm text-gray-600 mb-1">Listed</p>
                <p className="text-lg font-display font-bold text-gray-900">
                  {format(new Date(property.date_listed_timestamp_c), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-card p-6 sticky top-20"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
              Contact Agent
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <ApperIcon name="User" size={24} className="text-white" />
                </div>
<div>
                  <p className="font-medium text-gray-900">{property.contact_name_c}</p>
                  <p className="text-sm text-gray-600">Real Estate Agent</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <ApperIcon name="Phone" size={20} className="text-primary" />
                <span className="font-body">{property.contact_phone_c}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <ApperIcon name="Mail" size={20} className="text-primary" />
                <span className="font-body break-all">{property.contact_email_c}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={handleContact}
            >
              <ApperIcon name="MessageCircle" size={20} className="mr-2" />
              Send Message
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleContact}
            >
              <ApperIcon name="Phone" size={20} className="mr-2" />
              Schedule Viewing
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;