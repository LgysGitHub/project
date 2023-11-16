export const formatTime = (seconds: number): string => {
  seconds = Math.round(seconds)
  const hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : Math.floor(seconds / 3600)
  const hourS = hour >= 10 ? hour : `0${hour}`
  seconds -= 3600 * hour
  const min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : Math.floor(seconds / 60)
  const minS = min >= 10 ? min : `0${min}`
  seconds -= 60 * min
  const sec = seconds >= 10 ? seconds : `0${seconds}`
  return `${hourS}:${minS}:${sec}`
}
