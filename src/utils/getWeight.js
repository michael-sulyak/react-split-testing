export default function getWeight(weight) {
  return (weight || weight === 0) ? parseFloat(weight) : 1
}
