const websiteService = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL,

  loadWebsiteInformation: async () => {
    try {
      const response = await fetch(`${ websiteService.baseUrl }`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const websiteData = await response.json()
      return websiteData
    } catch (error) {
      console.log(error)
    }
  },
}

export default websiteService
