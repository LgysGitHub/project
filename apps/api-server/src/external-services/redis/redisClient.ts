import Redis from 'ioredis'

const client = new Redis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379', {
  password: process.env.REDIS_PASSWORD
})

export async function set (key: string, value: string): Promise<void> {
  await client.set(key, value)
}

export async function setExpire (key: string, value: string, expireSec: number): Promise<void> {
  await client.set(key, value, 'EX', expireSec)
}

export async function get (key: string): Promise<string | undefined> {
  const v = await client.get(key)
  return v === null ? undefined : v as any
}

export async function del (key: string): Promise<void> {
  await client.del(key)
}

export async function bgsave (): Promise<void> {
  await client.bgsave()
}

export function getInstance (): any {
  return client
}
