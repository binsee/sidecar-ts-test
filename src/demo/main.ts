import { attach } from 'sidecar'
import { DemoSidecar } from './demo-sidecar.js'

async function main() {
  const sidecar = new DemoSidecar()
  await attach(sidecar)
  sidecar.on('hook', async ({method, args}) => {
    console.log(`Recv Hook [${method}]:`, args[0],args[1])
  })
  const name = await sidecar.getName()
  console.log('get Name:',name)
  await sidecar.output('hello world')
}

main()
