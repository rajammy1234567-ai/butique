const Banner = require('../models/Banner');

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ position: 1 });
    res.json({
      success: true,
      banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }
    res.json({
      success: true,
      banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create banner (Admin only)
exports.createBanner = async (req, res) => {
  try {
    const { title, description, image, link, isActive, bannerType, startDate, endDate, cta_text, cta_link } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Banner image is required'
      });
    }

    const banner = new Banner({
      title,
      description,
      image,
      link,
      isActive: isActive !== undefined ? isActive : true,
      bannerType: bannerType || 'promotion',
      startDate,
      endDate,
      cta_text,
      cta_link
    });

    await banner.save();

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update banner (Admin only)
exports.updateBanner = async (req, res) => {
  try {
    const { title, description, image, link, isActive, bannerType, startDate, endDate, cta_text, cta_link, position } = req.body;

    let banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    // Update fields
    if (title !== undefined) banner.title = title;
    if (description !== undefined) banner.description = description;
    if (image !== undefined) banner.image = image;
    if (link !== undefined) banner.link = link;
    if (isActive !== undefined) banner.isActive = isActive;
    if (bannerType !== undefined) banner.bannerType = bannerType;
    if (startDate !== undefined) banner.startDate = startDate;
    if (endDate !== undefined) banner.endDate = endDate;
    if (cta_text !== undefined) banner.cta_text = cta_text;
    if (cta_link !== undefined) banner.cta_link = cta_link;
    if (position !== undefined) banner.position = position;

    await banner.save();

    res.json({
      success: true,
      message: 'Banner updated successfully',
      banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete banner (Admin only)
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Toggle banner active status (Admin only)
exports.toggleBannerStatus = async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      success: true,
      message: `Banner ${banner.isActive ? 'activated' : 'deactivated'} successfully`,
      banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
