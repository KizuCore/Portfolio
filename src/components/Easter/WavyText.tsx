"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

type WavyTextProps = {
    text: string
}

export default function WavyText({ text }: WavyTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            const { chars } = splitText(
                containerRef.current.querySelector(".wavy")!
            )
            containerRef.current.style.visibility = "visible"

            const staggerDelay = 0.15

            animate(
                chars,
                { y: [-20, 20] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    duration: 2,
                    delay: stagger(
                        staggerDelay,
                        { startDelay: -staggerDelay * chars.length }
                    ),
                }
            )
        })
    }, [])

    return (
        <div className="wavy-text-container" ref={containerRef}>
            <h1 className="h1 wavy">{text}</h1>
            <style>{`
        .wavy-text-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          visibility: hidden;
        }

        .split-char {
          will-change: transform, opacity;
          display: inline-block;
        }
      `}</style>
        </div>
    )
}
