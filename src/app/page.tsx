'use client'

import { Button } from "@/components/ui/button"
import { getRandomQuote } from "@/action/getQuotes"
import { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGetQuote = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const result = await getRandomQuote()
      
      if (result.success && result.quote) {
        setCurrentQuote(result.quote)
      } else {
        setError(result.error || 'Failed to fetch quote')
        setCurrentQuote('')
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
      setError('An error occurred while fetching the quote')
      setCurrentQuote('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }
          @keyframes blink {
            0%, 50% {
              border-color: transparent;
            }
            51%, 100% {
              border-color: white;
            }
          }
          .typing-text {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid white;
            animation: typing 3s steps(30, end) infinite, blink 1s infinite;
            width: 0;
            display: inline-block;
          }
          .character-swap {
            cursor: pointer;
          }
          .character-swap .default-image {
            display: block;
          }
          .character-swap .hover-image {
            display: none;
          }
          .character-swap:hover .default-image {
            display: none;
          }
          .character-swap:hover .hover-image {
            display: block;
          }
          .btn-popup {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-popup:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          }
          .btn-popup:active {
            transform: scale(0.95);
          }
        `
      }} />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(furinabg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.25,
        }}
      />

      <header className="relative z-10 px-6 py-4 mx-8" style={{ backgroundColor: "#151F59", borderRadius: "12px", marginTop: "16px" }}>
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 relative character-swap">
              <Image
                src="/furina1.jpg"
                alt="Furi Character"
                width={64}
                height={64}
                className="w-full h-full object-contain default-image"
              />
              <Image
                src="/furina2.png"
                alt="Furi Character Hover"
                width={64}
                height={64}
                className="w-full h-full object-contain hover-image"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-white">FURI</span>
              <span style={{ color: "#84B8D9" }}>QUOTA</span>
            </h1>
          </div>
          <nav className="flex items-center">
            <div className="flex items-center gap-6 px-6 py-2 rounded-lg">
              <a href="/homepage" className="text-lg font-medium transition-colors hover:text-white" style={{ fontFamily: "'Poppins', sans-serif", color: "#84B8D9" }}>
                Home
              </a>
              
              <a href="/quoet" className="text-white hover:text-blue-300 transition-colors text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Quoet
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 relative">
            <div className="flex justify-between items-center mb-12">
              <div></div>
              <h2
                className="text-white font-bold tracking-wider text-center"
                style={{
                  fontSize: "64px",
                  textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.6)",
                  WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                QUOTE OF THE DAY
              </h2>
              <Button 
                onClick={handleGetQuote}
                disabled={isLoading}
                className="text-white px-10 py-4 rounded-full text-xl font-medium shadow-lg btn-popup disabled:opacity-50" 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#151F59"
                }}
              >
                {isLoading ? 'Loading...' : 'click here'}
              </Button>
            </div>

            <div className="relative swap-container">
              <div 
                className="relative mx-auto max-w-4xl shadow-2xl"
                style={{
                  backgroundColor: "#151F59",
                  borderRadius: "80px",
                  padding: "3rem 2rem",
                  minHeight: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {error ? (
                  <div className="text-red-300 text-xl text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {error}
                  </div>
                ) : currentQuote ? (
                  <blockquote className="text-white text-2xl lg:text-3xl leading-relaxed font-medium text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    &ldquo;{currentQuote}&rdquo;
                  </blockquote>
                ) : (
                  <div className="text-gray-300 text-xl text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Click the button above to get a random quote
                  </div>
                )}
              </div>

              <div className="mt-8 text-center swap-element typing-text-element">
                <div 
                  className="text-white text-xl font-medium typing-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: "4px 4px 12px rgba(0, 0, 0, 0.8), 2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(132, 184, 217, 0.4)",
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
                  }}
                >
                  Furina is here for you ✨
                </div>
              </div>

              <div className="absolute -bottom-8 left-12 w-32 h-32 hidden lg:block z-10 character-swap">
                <Image 
                  src="/furina1.jpg" 
                  alt="Character Bottom Left" 
                  width={128}
                  height={128}
                  className="w-full h-full object-contain default-image"
                />
                <Image 
                  src="/furina2.png" 
                  alt="Character Bottom Left Hover" 
                  width={128}
                  height={128}
                  className="w-full h-full object-contain hover-image"
                />
              </div>

              <div className="absolute -bottom-8 right-12 w-32 h-32 hidden lg:block z-10 character-swap">
                <Image 
                  src="/furina2.png" 
                  alt="Character Bottom Right" 
                  width={128}
                  height={128}
                  className="w-full h-full object-contain default-image"
                />
                <Image 
                  src="/furina1.jpg" 
                  alt="Character Bottom Right Hover" 
                  width={128}
                  height={128}
                  className="w-full h-full object-contain hover-image"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <a href="/quoet">
              <Button 
                className="text-white px-16 py-5 rounded-full text-2xl font-medium shadow-lg btn-popup" 
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#151F59"
                }}
              >
                Summit a quoet 
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}



