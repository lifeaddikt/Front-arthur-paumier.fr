const pictureService = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACK_URL + 'wp/v2',

  loadPictures: async () => {
    try {
      const response = await fetch(`${ pictureService.baseUrl }/picture`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const pictures = await response.json()
      return pictures
    } catch (error) {
      console.log(error)
    }
  },

  loadPicturesByCollection: async slug => {
    try {
      const response = await fetch(
        `${ pictureService.baseUrl }/picture?_embed&collection_slug=${ slug }`,
      )
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const pictures = await response.json()
      return pictures
    } catch (error) {
      console.log(error)
    }
  },

  loadPictureById: async id => {
    try {
      const response = await fetch(
        `${ pictureService.baseUrl }/picture/${id}?_embed`,
      )
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const picture = await response.json()
      return picture
    } catch (error) {
      console.log(error)
    }
  },
}

export default pictureService
