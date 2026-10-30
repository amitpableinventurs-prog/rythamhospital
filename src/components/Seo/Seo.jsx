import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PAGE_META } from '../../../shared/site.js'
import { SITE, absoluteUrl } from '../../lib/seo'

/**
 * Page-level SEO tags: title, description, canonical URL, Open Graph /
 * Twitter cards and JSON-LD structured data. Pass `path` for a page listed in
 * shared/site.js to use its title and description, or pass them directly.
 */
const Seo = ({
  path,
  title,
  description,
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  jsonLd = [],
  publishedTime,
  modifiedTime,
}) => {
  const defaults = PAGE_META[path] || {}
  const pageTitle = title || defaults.title || SITE.name
  const pageDescription = description || defaults.description || SITE.description
  const url = path ? absoluteUrl(path) : null
  const shareImage = absoluteUrl(image || SITE.shareImage)
  const schemas = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean)

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {url && !noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={shareImage} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={shareImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {/* Escape "<" so content such as a post title can't close the script tag. */}
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
