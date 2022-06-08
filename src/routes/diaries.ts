import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

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
  try {
    const newDiaryEntry = toNewDiaryEntry(_req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e) {
    res.status(400).send(e)
  }
})

export default router
