import { createRouter, defineEventHandler, useBase } from 'h3'
import * as dictionary from '@/server/data/dictionary'

const router = createRouter()

router.get('/getDictionary', defineEventHandler((event) => {
  return dictionary
}))

export default useBase('/api/dictionary', router.handler)
