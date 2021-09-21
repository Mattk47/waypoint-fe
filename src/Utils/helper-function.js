export const getTimeSince = (dateStr) => {
  const timeCreated = new Date(dateStr)
  const timeNow = Date.now()

  const differenceInSeconds = (timeNow - timeCreated) / 1000

  if (differenceInSeconds < 60) {
    return '<1 minute ago'
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60)
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600)
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else if (differenceInSeconds < 604800) {
    const days = Math.floor(differenceInSeconds / 86400)
    return days === 1 ? '1 day ago' : `${days} days ago`
  } else if (differenceInSeconds < 2419200) {
    const weeks = Math.floor(differenceInSeconds / 604800)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  } else if (differenceInSeconds < 31449600) {
    const months = Math.floor(differenceInSeconds / 2419200)
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else {
    const years = Math.floor(differenceInSeconds / 31449600)
    return years === 1 ? '1 year ago' : `${years} years ago`
  }
}
