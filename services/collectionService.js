const collectionService = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL + 'wp/v2',

  loadAllCollections: async () => {
    try {
      const response = await fetch(`${ collectionService.baseUrl }/collection?acf_format=standard&per_page=100`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const collections = await response.json()
      return collections
    } catch (error) {
      console.log(error)
    }
  },

  loadCollection: async slug => {
    try {
      const response = await fetch(`${ collectionService.baseUrl }/collection?slug=${ slug }&acf_format=standard`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const collection = await response.json()
      return collection
    } catch (error) {
      console.log(error)
    }
  },
}

export default collectionService
