import puppeteer from 'puppeteer'
import { login } from '../src'
;(async () => {
  const CLIENT_NUMBER = process.argv[2]
  const ACCESS_CODE = process.argv[3]

  if (!CLIENT_NUMBER) throw new Error('Client number and access code not supplied as arguments.')
  if (!ACCESS_CODE) throw new Error('Access code not supplied as arguments.')
  if (!CLIENT_NUMBER.match(/\d+/)) throw new Error('Invalid client number')
  if (!ACCESS_CODE.match(/\d+/)) throw new Error('Invalid access code')

  const browser = await puppeteer.launch({ headless: false, devtools: true })
  const page = await browser.newPage()

  const authToken = await login(page, CLIENT_NUMBER, ACCESS_CODE)
  console.log(authToken)

  await browser.close()
})()
