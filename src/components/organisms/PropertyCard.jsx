import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import PriceTag from "@/components/molecules/PriceTag";
import PropertyStats from "@/components/molecules/PropertyStats";
import FavoriteButton from "@/components/molecules/FavoriteButton";
import Badge from "@/components/atoms/Badge";

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
<Link to={`/property/${property.Id}`} className="block group">
        <div className="bg-white rounded-lg shadow-card overflow-hidden transition-all duration-200 group-hover:shadow-card-hover">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={property.images[0]}
alt={property.title_c}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
src={property.images_c[0]}
            <div className="absolute top-3 right-3">
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
              />
            </div>
            <div className="absolute top-3 left-3">
<PriceTag price={property.price_c} />
            </div>
            <div className="absolute bottom-3 left-3">
<Badge variant="primary">{property.property_type_c}</Badge>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
{property.title_c}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <ApperIcon name="MapPin" size={16} className="text-primary flex-shrink-0" />
<span className="line-clamp-1">{property.city_c}, {property.state_c}</span>
            </div>

<PropertyStats
              bedrooms={property.bedrooms_c}
              bathrooms={property.bathrooms_c}
              squareFeet={property.square_feet_c}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;