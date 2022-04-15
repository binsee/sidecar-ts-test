/*
 * @Author       : binsee
 * @Date         : 2022-04-15 13:37:19
 * @LastEditTime : 2022-04-15 14:28:13
 * @LastEditors  : binsee
 * @Description  :
 */

import { name } from './config'

export const sayCallback = new NativeCallback(() => {}, 'void', ['int', 'pointer'])
const sayFunction = new NativeFunction(sayCallback, 'void', ['int', 'pointer'])

export const getName = () => name

export const output = (str: string) => {
  console.log('output() arg:', str)

  const text = `${name} say: ${str}`
  sayFunction(Date.now(), Memory.allocUtf8String(text))
}

export const error = () => {
  throw new Error('test error')
}

console.log(`Hello ${getName()}!`)
