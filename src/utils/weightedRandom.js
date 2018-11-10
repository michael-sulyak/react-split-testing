function getRandom(seed) {
  let newSeed = 0

  for (let i = 0; i < seed.length; i++) {
    newSeed += seed.charCodeAt(i) * Math.pow(10, i)
  }

  const x = Math.sin(newSeed) * 10000
  return x - Math.floor(x)
}


export default function weightedRandom(weights, randomSeed) { // randomSeed must be a string
  if (!randomSeed) {
    return -1
  }

  let totalWeight = 0

  for (let i = 0; i < weights.length; i++) {
    totalWeight += weights[i]
  }

  let random = getRandom(randomSeed) * totalWeight

  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i
    }

    random -= weights[i]
  }

  return -1
}
