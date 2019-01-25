function generateIdentifier() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''

  for (let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export default function getIdentifier(userIdentifier) {
  if (userIdentifier || userIdentifier === 0) {
    return String(userIdentifier)
  }

  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return null
  }

  const key = '__ab_experiment_identifier__'

  try {
    userIdentifier = localStorage.getItem(key)
    userIdentifier = userIdentifier && String(userIdentifier)

    if (!userIdentifier) {
      userIdentifier = generateIdentifier()
      localStorage.setItem(key, userIdentifier)
    }
  } catch (exception) {
    return null
  }

  return userIdentifier
}
