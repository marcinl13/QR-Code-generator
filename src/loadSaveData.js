const VARIABLE = "history"

function load() {
  const data = localStorage.getItem(VARIABLE)

  if (data)
    return JSON.parse(data)

  return []
}

function save(data) {
  localStorage.setItem(VARIABLE, JSON.stringify(data))
}

module.exports = {
  load,
  save
}