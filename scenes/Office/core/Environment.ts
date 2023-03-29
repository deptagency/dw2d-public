const env = {
  isDebug: process.env.NEXT_PUBLIC_DEBUG,
  redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://deptagency.com',
}

export default env
