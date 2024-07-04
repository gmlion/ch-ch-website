/**
 * Turn the array of publications into an object using the documentId as key
 */
export const makeKeyedPublications = (publications) => {
  const pairs = publications.map((publication) => [
    publication.systemdata?.documentId || 0,
    publication,
  ])
  return Object.fromEntries(pairs)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getPage(get, url, trial = 1) {
  const delayTime = trial === 1 ? 0 : 10 * Math.pow(2, trial - 2)
  await delay(delayTime)

  return get(url, { responseType: 'json' }).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(`error: ${error}, url: ${url}, trial: ${trial} / 11`)
    if (trial < 11) return getPage(get, url, trial + 1)
    else throw new Error(`Too many trials`)
  })
}

const getNext10Pages = (get, options = {}) => {
  const promises = []
  for (let i = 1; i <= 10; i++) {
    const url = `documents/latestPublications?offset=${
      options.offset + (i - 1) * 100
    }${options.contentTypes ? `&contentTypes=${options.contentTypes}` : ''}`

    promises.push(getPage(get, url))
  }
  return Promise.all(promises)
}

export const getAllPublications = async (get, options) => {
  let publications = []
  let offset = 0
  // Lets crawl trough the api
  while (true) {
    // Get the next 10 pages
    const publicationResponses = await getNext10Pages(get, {
      ...options,
      offset,
    })

    // Sometimes it is nested in the property data,
    // sometimes not
    // Lets use data if it is defined
    let publicationPages
    if (publicationResponses[0].data) {
      publicationPages = publicationResponses.map((response) => response.data)
    } else {
      publicationPages = publicationResponses
    }

    for (const idx in publicationPages) {
      const publicationsList = publicationPages[idx]
      publications = publications.concat(publicationsList)
    }

    offset += 1000
    // If the publications length is not the offset length we reached the end
    if (publications.length !== offset) {
      break
    }
  }
  return publications
}

export const getPublicationById = async (id, get) => {
  return (await get(`documents/${id}/latestPublication`)).data
}

export const getPublicationFromMediaLibrary = async (id, get) => {
  return (await get(`mediaLibrary/${id}`)).data
}
