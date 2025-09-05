'use client'

import { Button } from "@/components/ui/button"
import { submitQuote } from "@/action/quoet"
import { useState, useRef } from "react"

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    
    console.log('Form submitted - client side')
    
    try {
      const formData = new FormData(event.currentTarget)
      console.log('FormData created:', formData.get('quote'))
      
      const result = await submitQuote(formData)
      console.log('Server action result:', result)
      
      if (result.success) {
        setIsSuccess(true)
        setMessage(result.message || 'Quote submitted successfully!')
     
        formRef.current?.reset()
      } else {
        setIsSuccess(false)
        setMessage(result.error || 'Failed to submit quote')
      }
    } catch (error) {
      console.error('Client-side error:', error)
      setIsSuccess(false)
      setMessage('An error occurred while submitting the quote')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
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
              <img
                src="/furina1.jpg"
                alt="Furi Character"
                className="w-full h-full object-contain default-image"
              />
              <img
                src="/furina2.png"
                alt="Furi Character Hover"
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
              <a href="/homepage" className="text-lg font-medium transition-colors hover:text-white" style={{ fontFamily: "'Poppins', sans-serif", color: "#f6f6f6ff" }}>
                Home
              </a>
              <a href="/quoet" className="text-white hover:text-blue-300 transition-colors text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif",color: "#84B8D9" }}>
                Quoet
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center relative">
            <div 
              className="p-8 mx-auto max-w-3xl shadow-2xl mb-16"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "30px",
              }}
            >
              <h2 
                className="text-4xl font-bold mb-8"
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  color: "#151F59"
                }}
              >
                Tell Us About your unique quoet
              </h2>
              
              {message && (
                <div 
                  className={`mb-6 p-4 rounded-lg text-center ${
                    isSuccess 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {message}
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <textarea
                    name="quote"
                    placeholder="Enter here"
                    className="w-full p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
                    rows={6}
                    required
                    disabled={isSubmitting}
                    style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "16px",
                      color: "#666"
                    }}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white px-12 py-4 rounded-full text-xl font-medium shadow-lg btn-popup disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      backgroundColor: "#151F59"
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </div>

          
            <div className="relative flex justify-between items-center mt-8">
            
              <div className="w-32 h-32 hidden lg:block character-swap">
                <img 
                  src="/furina1.jpg" 
                  alt="Character Bottom Left" 
                  className="w-full h-full object-contain default-image"
                />
                <img 
                  src="/furina2.png" 
                  alt="Character Bottom Left Hover" 
                  className="w-full h-full object-contain hover-image"
                />
              </div>

            
              <div className="flex-1 text-center">
                <div 
                  className="text-white text-xl font-medium typing-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: "4px 4px 12px rgba(0, 0, 0, 0.8), 2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(132, 184, 217, 0.4)",
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
                  }}
                >
                  Thank you for your quoet ✨
                </div>
              </div>

         
              <div className="w-32 h-32 hidden lg:block character-swap">
                <img 
                  src="/furina2.png" 
                  alt="Character Bottom Right" 
                  className="w-full h-full object-contain default-image"
                />
                <img 
                  src="/furina1.jpg" 
                  alt="Character Bottom Right Hover" 
                  className="w-full h-full object-contain hover-image"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


