import blogCheckup from '../assets/illustrations/blog-checkup.svg'
import blogHeart from '../assets/illustrations/blog-heart.svg'
import blogNutrition from '../assets/illustrations/blog-nutrition.svg'

// Illustration shown when a post has no cover photo, picked by category.
const FALLBACK_COVERS = [
  { match: /cardio|heart/i, image: blogHeart },
  { match: /nutrition|diet|pediatric|child|food/i, image: blogNutrition },
]

export const coverFor = (post) =>
  post.coverImage || FALLBACK_COVERS.find((entry) => entry.match.test(post.category))?.image || blogCheckup

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

export const initialsOf = (name = '') => name.replace(/^Dr\.?\s*/i, '').trim().charAt(0).toUpperCase() || 'R'
