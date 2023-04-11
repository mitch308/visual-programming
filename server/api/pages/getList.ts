import fs from 'fs';

export default defineEventHandler((event) => {
  const pageListStr = fs.readFileSync('./server/data/pages.json', {encoding: 'utf-8'})
  const pageList = JSON.parse(pageListStr)
  return pageList
})
