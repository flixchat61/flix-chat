import React from "react";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Head = ({
  siteMetadata: {
    description,
    author = "Md Monirul Islam",
    siteUrl,
    themeColor,
    image,
    title
  },
}) => {

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>
        {title}
      </title>

      <link rel="canonical" href={siteUrl} />
      {/* <link rel="icon" href={FavIcon} type="image/png" />
      <link rel="shortcut icon" href={FavIcon} type="image/png" /> */}
      {/* <link rel="preload" href="https://fonts.googleapis.com/css?family=Rubic|Helvetica+Neue|Helvetica|Arial&display=swap" />  */}
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor || "#fff"} />
      <meta name="author" content={author} />
      {/* <meta name="keywords" content={site.siteMetadata.keywords.join(",")} />
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta> 
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />;//* img-src https://*; child-src 'none';"> 
       */}
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

      {/* For sharing */}
      <meta name="og:url" content={siteUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property="og:image" content={image} />
      {/* <meta property="og:image:width" content={metaImage.width} />
            <meta property="og:image:height" content={metaImage.height} /> 
            <meta property="fb:admins" content="USER_ID"/> 
            <meta property="fb:app_id" content="your_app_id" />
        */}

      {/* For twitter sharing */}
      {/* <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:card" content="summary" /> */}

      {/* <meta name="twitter:site" content="@website-username"> 
            <meta property='twitter:creator' content={author} />   
            <meta name='twitter:title' content={pageName == Page.article ? title : pageName} /> 
        */}

    </Helmet>
  );
};

Head.propTypes = {
  siteMetadata: PropTypes.shape({
    description: PropTypes.string,  //Meta description
    author: PropTypes.string,       //The creator of the website
    siteUrl: PropTypes.string,      //The canonical url of the page
    themeColor: PropTypes.string,
    image: PropTypes.string,        //The image displayed when the page is shared
    title: PropTypes.string         //The title displayed in the tab section at the top of the page
  }),
};

export default Head;