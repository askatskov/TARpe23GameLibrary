import Listing from "./ListingModel.js";
import { Op } from "sequelize";

async function createListing(data) {
  const listing = await Listing.create(data);
  return listing.get({ plain: true });
}

async function getListingById(id) {
  const listing = await Listing.findByPk(id);
  return listing ? listing.get({ plain: true }) : null;
}

async function updateListing(id, data) {
  const listing = await Listing.findByPk(id);
  if (!listing) return null;

  Object.assign(listing, data);
  await listing.save();
  return listing.get({ plain: true });
}

async function deleteListing(id) {
  return Listing.destroy({ where: { id } });
}

async function listListings(filters = {}) {
  const where = {};

  if (filters.type) where.type = filters.type;
  if (filters.itemType) where.itemType = filters.itemType;
  if (filters.status) where.status = filters.status;
  if (filters.gameRawgId) where.gameRawgId = filters.gameRawgId;
  if (filters.platform) where.platform = filters.platform;
  if (filters.userId) where.userId = filters.userId;

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
    if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
  }

  const order = [["createdAt", "DESC"]];

  const listings = await Listing.findAll({ where, order });
  return listings.map((l) => l.get({ plain: true }));
}

export const listingService = {
  createListing,
  getListingById,
  updateListing,
  deleteListing,
  listListings,
};
