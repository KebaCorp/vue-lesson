/**
 * Class Hero.
 */
export default class Hero {
  _id = null
  fullName = null
  mainPhoto = null
  shortDescription = null
  description = null
  views = null
  creatorUserId = null
  createdAt = null
  updatedAt = null

  /**
   * Constructor.
   *
   * @param _id
   * @param fullName
   * @param mainPhoto
   * @param shortDescription
   * @param description
   * @param views
   * @param creatorUserId
   * @param createdAt
   * @param updatedAt
   */
  constructor ({ _id, fullName, mainPhoto, shortDescription, description, views, creatorUserId, createdAt, updatedAt }) {
    this._id = _id || null
    this.fullName = fullName || null
    this.mainPhoto = mainPhoto || null
    this.shortDescription = shortDescription || null
    this.description = description || null
    this.views = views || null
    this.creatorUserId = creatorUserId || null
    this.createdAt = createdAt || null
    this.updatedAt = updatedAt || null
  }

  /**
   * Full name.
   *
   * @returns {null}
   */
  getFullName () {
    return this.fullName
  }

  /**
   * Main photo.
   *
   * @returns {null}
   */
  getMainPhoto () {
    return this.mainPhoto
  }

  /**
   * Short description.
   *
   * @returns {null}
   */
  getShortDescription () {
    return this.shortDescription
  }

  /**
   * Get description.
   *
   * @returns {null}
   */
  getDescription () {
    return this.description
  }

  /**
   * Views.
   *
   * @returns {null}
   */
  getViews () {
    return this.views
  }
}
