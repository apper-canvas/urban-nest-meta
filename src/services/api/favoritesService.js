import { getApperClient } from "@/services/apperClient";

class FavoritesService {
  async getFavorites() {
    try {
      const apperClient = getApperClient();

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "property_id_c" } },
          { field: { Name: "saved_timestamp_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("favorite_c", params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Error reading favorites:", error);
      return [];
    }
  }

  async isFavorite(propertyId) {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.property_id_c === propertyId);
    } catch (error) {
      console.error("Error checking favorite:", error);
      return false;
    }
  }

  async addFavorite(propertyId) {
    try {
      const isFav = await this.isFavorite(propertyId);
      if (isFav) {
        return;
      }

      const apperClient = getApperClient();

      const params = {
        records: [
          {
            property_id_c: propertyId,
            saved_timestamp_c: new Date().toISOString(),
          },
        ],
      };

      const response = await apperClient.createRecord("favorite_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  }

  async removeFavorite(propertyId) {
    try {
      const favorites = await this.getFavorites();
      const favorite = favorites.find(fav => fav.property_id_c === propertyId);

      if (!favorite) {
        return;
      }

      const apperClient = getApperClient();

      const params = {
        RecordIds: [favorite.Id],
      };

      const response = await apperClient.deleteRecord("favorite_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  }

  async getFavoriteIds() {
    const favorites = await this.getFavorites();
    return favorites.map(fav => fav.property_id_c);
  }
}

export default new FavoritesService();