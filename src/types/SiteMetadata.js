import PropTypes from 'prop-types';
import colors from 'styles/js/colors.js';
import metadata from 'data/metadata.js';

class SiteMetadata {

    description;
    author = metadata.author;
    siteUrl;
    themeColor = colors.colorScheme.orange;
    title;
    image;

    constructor(title, path, description, image) {
        this.title = title;
        this.siteUrl = `${metadata.siteUrl}${path}`;
        this.description = description;
        this.image = image;
    };

};

SiteMetadata.propTypes = {
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,          //Path to this page excluding the root .com URL
    title: PropTypes.string.isRequired,
    image: PropTypes.string                     //Path to the image displayed when this page is shared
};

export default SiteMetadata;