import express from 'express'
import * as diaryServices from '../services/diaryServices'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (_req, res) => {
  const diary = diaryServices.findById(+_req.params.id) // el '+' es para que detecte que es un number, y no un string

  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!')
})

export default router
