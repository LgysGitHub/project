import React, { ReactElement, useEffect, useRef } from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import backgroundVideo from '../../assets/image/backgroundVideo.mp4'

import styles from './styles.module.scss'

export function HomePage (): ReactElement {
  const summaryRef = useRef<any>()
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#section',
      start: 'top top',
      end: '+=5000',
      scrub: true,
      pin: true,
      onUpdate(self) {
        try {
          summaryRef.current.currentTime = self.progress * summaryRef.current.duration
        } catch (e: any) {
          console.log(e)
        }
      }
    })
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.aaa}>展示效果</div>
      <section className={styles.screen} id='section'>
        <div className={styles.summaryContent}>
          <video ref={summaryRef} className={styles.summary} src={backgroundVideo}></video>
        </div>
      </section>
    </div>
  )
}
