import { getApperClient } from "@/services/apperClient";

class PropertyService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "listing_type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "parking_c" } },
          { field: { Name: "pet_friendly_c" } },
          { field: { Name: "date_listed_timestamp_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "contact_phone_c" } },
          { field: { Name: "contact_email_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("property_c", params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(property => this.parseProperty(property));
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "listing_type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "parking_c" } },
          { field: { Name: "pet_friendly_c" } },
          { field: { Name: "date_listed_timestamp_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "contact_phone_c" } },
          { field: { Name: "contact_email_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
      };

      const response = await apperClient.getRecordById("property_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error("Property not found");
      }

      if (!response?.data) {
        throw new Error("Property not found");
      }

      return this.parseProperty(response.data);
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  }

  async search(filters = {}) {
    try {
      const apperClient = getApperClient();

      const whereConditions = [];
      const whereGroups = [];

      if (filters.searchQuery) {
        const query = filters.searchQuery;
        whereGroups.push({
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "title_c",
                  operator: "Contains",
                  values: [query],
                },
                {
                  fieldName: "city_c",
                  operator: "Contains",
                  values: [query],
                },
                {
                  fieldName: "address_c",
                  operator: "Contains",
                  values: [query],
                },
                {
                  fieldName: "state_c",
                  operator: "Contains",
                  values: [query],
                },
              ],
              operator: "OR",
            },
          ],
        });
      }

      if (filters.priceMin !== undefined && filters.priceMin !== null) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.priceMin],
        });
      }

      if (filters.priceMax !== undefined && filters.priceMax !== null) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "LessThanOrEqualTo",
          Values: [filters.priceMax],
        });
      }

      if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
        whereConditions.push({
          FieldName: "bedrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.bedrooms],
        });
      }

      if (filters.bathrooms !== undefined && filters.bathrooms !== null) {
        whereConditions.push({
          FieldName: "bathrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.bathrooms],
        });
      }

      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        whereConditions.push({
          FieldName: "property_type_c",
          Operator: "ExactMatch",
          Values: filters.propertyTypes,
          Include: true,
        });
      }

      if (filters.listingTypes && filters.listingTypes.length > 0) {
        whereConditions.push({
          FieldName: "listing_type_c",
          Operator: "ExactMatch",
          Values: filters.listingTypes,
          Include: true,
        });
      }

      if (filters.squareFeetMin !== undefined && filters.squareFeetMin !== null) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.squareFeetMin],
        });
      }

      if (filters.squareFeetMax !== undefined && filters.squareFeetMax !== null) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "LessThanOrEqualTo",
          Values: [filters.squareFeetMax],
        });
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "listing_type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "parking_c" } },
          { field: { Name: "pet_friendly_c" } },
          { field: { Name: "date_listed_timestamp_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "contact_phone_c" } },
          { field: { Name: "contact_email_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
        where: whereConditions,
        whereGroups: whereGroups,
      };

      const response = await apperClient.fetchRecords("property_c", params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(property => this.parseProperty(property));
    } catch (error) {
      console.error("Error searching properties:", error);
      return [];
    }
  }

  parseProperty(property) {
    return {
      ...property,
      images_c: property.images_c ? JSON.parse(property.images_c) : [],
      amenities_c: property.amenities_c ? JSON.parse(property.amenities_c) : [],
    };
  }
}

export default new PropertyService();